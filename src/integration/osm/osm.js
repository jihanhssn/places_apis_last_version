const axios = require('axios');
const parseString = require('xml2js').parseString;
const geohash = require('ngeohash');
const amenityService = require('../../place_amenites/places_amenities_service')
const query = require('./fetch_from_osm_query');
const fetchFromOsmDao = require('./fetch_from_osm_dao');
const osmJob = require('./osm_job');
const idGenerator = require('../../../libs/id_genenator');

const addPlace = rec => {
	return new Promise((resolve, reject) => {
		let place_id = idGenerator.generateId();
		rec.place_id = place_id;
		fetchFromOsmDao.createPlace(rec)
			.then(data => resolve(data))
			.catch(err => { console.log(err); });
	});
}

const updatePlace = rec => {
	return new Promise((resolve, reject) => {
		fetchFromOsmDao.updatePlace(rec)
			.then(data => resolve(data)).catch(err => { console.log(err); });
	});
}

const asyncPlace = async rec => {
	return new Promise(async (resolve, reject) => {
		try {
			const obj = await fetchFromOsmDao.findPlace(rec.place_source_id);
			if (obj === null) {
				addPlace(rec);
			} else {
				updatePlace(rec);
			}
		} catch (err) {
			console.log(err)
		}
	});
}

const parseXML = res => {
	let nodes;

	parseString(res['data'], (err, result) => {
		nodes = result['osm']['node'];
	});

	return nodes;
}

const parseObj = nodes => {
	let objs = [];
	let obj = {};

	nodes.map(node => {
		const id = node['$']['id'];
		const lat = node['$']['lat'];
		const lon = node['$']['lon'];

		const gh = geohash.encode(lat, lon);
		const gh6 = gh.substr(0, 6);
		const gh5 = gh.substr(0, 5);

		const tags = node['tag'];

		let name, name_en, name_ar, amenity, address, open, phone, website;

		tags.map(tag => {
			key = tag['$']['k'];
			value = tag['$']['v'];

			if (key === 'name') {
				name = value;
			} else if (key === 'name:en') {
				name_en = value;
			} else if (key === 'name:ar') {
				name_ar = value;
			} else if (key === 'amenity') {
				amenity = value;
			} else if (key === 'addr:street') {
				address = value;
			} else if (key === 'opening_hours') {
				open = value;
			} else if (key === 'phone') {
				phone = value;
			} else if (key === 'website') {
				website = value;
			}
		});

		obj = {
			place_source: 1,
			place_source_id: id,
			name_en: name_en || name,
			name_ar: name_ar || null,
			amenity: amenity,
			latitude: lat,
			longitude: lon,
			geohash_9: gh,
			geohash_6: gh6,
			geohash_5: gh5,
			address: address || null,
			open: open || null,
			phone: phone || null,
			website: website || null
		};
		objs.push(obj);
	});

	return objs;
}

const osm = async () => {
	try {
		const res = await axios.post(query.overpassURL, query.query);
		const nodes = parseXML(res);
		const objs = parseObj(nodes);

		for (let rec of objs) {
			try {
				if (rec.amenity) {
					const amenity_id = await amenityService.createAmenity(rec.amenity);
					rec.amenity_id = amenity_id;
				}
				await addPlace(rec);

			} catch (err) {
				console.log(err);
			}
		}
	} catch (err) {
		console.log(err);
	}
}

const osmAsync = async () => {
	try {
		const res = await axios.post(query.overpassURL, query.query);
		const nodes = parseXML(res);
		const objs = parseObj(nodes);

		for (let rec of objs) {
			try {
				if (rec.amenity) {
					const amenity_id = await amenityService.createAmenity(rec.amenity)
					rec.amenity_id = amenity_id
				}
				let createdObj = await asyncPlace(rec);
			} catch (err) {
				console.log(err)
			}
		};
	} catch (err) {
		console.log(err);
	}
}

const job = async () => {
	await osmJob.job(osmAsync())
}

module.exports = { osm, job };
