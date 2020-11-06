const _ = require('lodash');
const rp = require('request-promise');


module.exports = (apiKey, uri, user) => {

    const headers = {
            //"Access-Control-Allow-Origin": "*",
            //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"        
    }

    const photoSetsOptions = {
        uri,
        qs: {
            method: 'flickr.photosets.getList',
            primary_photo_extras: 'url_s',
            user_id: user,
            api_key: apiKey,
            per_page: 10,
            nojsoncallback: 1,
            format: 'json'
        },
        headers: headers,
        json: true
    };

    return rp(photoSetsOptions)
        .then((data) => {
            return data.photosets.photoset.map((p) => { return p.id; });
        })
        .then((ids) => {
            const a = _.map(ids, (id) => {
                return rp(
                    {
                        uri,
                        qs: {
                            method: 'flickr.photosets.getPhotos',
                            user_id: user,
                            api_key: apiKey,
                            photoset_id: id,
                            extras: 'url_m,url_s,tags',
                            nojsoncallback: 1,
                            format: 'json'
                        },
                        headers: headers,
                        json: true
                    }
                );
            });

            return Promise.all(a).then((p) => { return p; });
        })
        .then((photos) => {
            const p = _.map(_.flatten(_.map(photos, 'photoset.photo')), (photo) => {
                return {
                    url_m: photo.url_m,
                    title: photo.title,
                    id: photo.id,
                    tags: photo.tags.split(' ')
                };
            });
            return p;
        })
        .then((photos) => {
            const a = _.map(photos, (photo) => {
                const p1 = photo;
                return rp(
                    {
                        uri,
                        qs: {
                            method: 'flickr.photos.getExif',
                            user_id: user,
                            api_key: apiKey,
                            photo_id: photo.id,
                            nojsoncallback: 1,
                            format: 'json'
                        },
                        headers: headers,
                        json: true
                    }
                ).then((p) => {
                    const exifProperties = ['Make', 'Model', 'ISO', 'ExposureTime', 'FNumber', 'LensModel', 'Lens', 'FocalLength'];
                    const v = _.map(exifProperties, (property) => {
                        const w = _.find(p.photo.exif, (e) => {
                            return e.tag === property;
                        });
                        const exifProp = {};
                        exifProp[property] = '';
                        if (w !== undefined) {
                            // eslint-disable-next-line no-underscore-dangle
                            exifProp[property] = w.raw._content;
                        }
                        return exifProp;
                    });

                    p1.exif = {};
                    _.forEach(v, (i) => {
                        _.mapKeys(i, (value, key) => {
                            p1.exif[key] = value;
                        });
                    });

                    return p1;
                });
            });

            return Promise.all(a).then((p) => { return p; });
        })
        .then((photos) => {
            const a = _.map(photos, (photo) => {
                const p2 = photo;
                return rp(
                    {
                        uri,
                        qs: {
                            method: 'flickr.photos.getSizes',
                            user_id: user,
                            api_key: apiKey,
                            photo_id: photo.id,
                            nojsoncallback: 1,
                            format: 'json'
                        },
                        headers: headers,
                        json: true
                    }
                ).then((p) => {
                    // eslint-disable-next-line no-param-reassign
                    p2.sizes = {};
                    _.forEach(p.sizes.size, (i) => {
                        p2.sizes[i.label] = i;
                    });

                    return p2;
                });
            });

            return Promise.all(a).then((p) => { return p; });
        });
};
