using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Linq;
using cieclarke.Models;

namespace cieclarke.Lib
{
    public class FlickrService : IPhotoService
    { 
        private readonly HttpClient httpClient;
        private readonly string user;
        private readonly string api;
        private readonly Uri baseAddress;
    
        public FlickrService(HttpClient httpClient, string api, string user)
        {
            this.httpClient = httpClient;
            this.api = api;
            this.user = user;
            this.baseAddress = httpClient.BaseAddress;
        }

        public async Task<IList<Photo>> GetPhotos(Album album)
        {
            var photos = new List<Photo>();
            var uri = new UriBuilder(this.baseAddress);
            var query = HttpUtility.ParseQueryString(uri.Query);

            query["method"] = "flickr.photosets.getPhotos";
            query["extras"] = "tags,url_sq,url_t,url_s,url_m,url_o,date_upload";
            query["user_id"] = this.user;
            query["api_key"] = this.api;
            query["photoset_id"] = album.ID;
            query["format"] = "rest";

            uri.Query = query.ToString();

            using (var client = await httpClient.GetAsync(uri.Uri))
            {
                if (client.IsSuccessStatusCode)
                {
                    var s = await client.Content.ReadAsStringAsync();
                    XmlDocument doc = new XmlDocument();
                    doc.PreserveWhitespace = true;
                    doc.LoadXml(s);

                    var photosetsNodes = doc.SelectNodes("//photo");
                    foreach (XmlNode photosetsNode in photosetsNodes)
                    {
                        Dictionary<PhotoSizeType, Uri> sizeUrls = new Dictionary<PhotoSizeType, Uri>();
                        sizeUrls.Add(PhotoSizeType.SQUARE, new Uri(photosetsNode.Attributes["url_sq"].Value));
                        sizeUrls.Add(PhotoSizeType.THUMBNAIL, new Uri(photosetsNode.Attributes["url_t"].Value));
                        sizeUrls.Add(PhotoSizeType.SMALL, new Uri(photosetsNode.Attributes["url_s"].Value));
                        sizeUrls.Add(PhotoSizeType.MEDIUM, new Uri(photosetsNode.Attributes["url_m"].Value));
                        //sizeUrls.Add(PhotoSizeType.ORIGINAL, new Uri(photosetsNode.Attributes["url_o"].Value));

                        Photo photo = new Photo
                        {
                            ID = photosetsNode.Attributes["id"].Value,
                            Title = photosetsNode.Attributes["title"].Value,
                            Uploaded = DateTimeOffset.FromUnixTimeSeconds(long.Parse(photosetsNode.Attributes["dateupload"].Value)).DateTime,
                            SizeURLs = sizeUrls,
                            Tags = new List<Tag>(Array.ConvertAll(photosetsNode.Attributes["tags"].Value.Split(" "), new Converter<string, Tag>(tag => { return new Tag { ID = tag }; })))
                        };

                        photos.Add(photo);
                    }

                }

                
            }

            return photos;
        }

        public async Task<IList<Album>> GetAlbums()
        {
            var albums = new List<Album>();
            var uri = new UriBuilder(this.baseAddress);
            var query = HttpUtility.ParseQueryString(uri.Query);

            query["method"] = "flickr.photosets.getList";
            query["primary_photo_extras"] = "url_m";
            query["user_id"] = this.user;
            query["api_key"] = this.api;
            query["per_page"] = "10";
            query["format"] = "rest";


            uri.Query = query.ToString();

            using (var client = await httpClient.GetAsync(uri.Uri))
            {
                if (client.IsSuccessStatusCode)
                {
                    var s = await client.Content.ReadAsStringAsync();
                    XmlDocument doc = new XmlDocument();
                    doc.PreserveWhitespace = true;
                    doc.LoadXml(s);

                    var photosetsNodes = doc.SelectNodes("//photoset");
                    foreach(XmlNode photosetsNode in photosetsNodes)
                    {
                        Album album = new Album
                        {
                            ID = photosetsNode.Attributes["id"].Value,
                            Title = photosetsNode.SelectSingleNode("title").InnerText,
                            Description = photosetsNode.SelectSingleNode("description").InnerText
                        };

                        albums.Add(album);
                    }

                }

                return albums;
            }

        }

        public async Task<IList<Photo>> GetRecentPhotos(int count)
        {
            var photos = new List<Photo>();

            if (count <= 0 )
            {
                return photos;
            }

            var uri = new UriBuilder(this.baseAddress);
            var query = HttpUtility.ParseQueryString(uri.Query);

            query["method"] = "flickr.people.getPublicPhotos";
            query["extras"] = "tags,date_upload,url_sq,url_t,url_s,url_m";
            query["include_self"] = "1";
            query["user_id"] = this.user;
            query["count"] = count.ToString();
            query["api_key"] = this.api;
            query["format"] = "rest";

            uri.Query = query.ToString();

            using (var client = await httpClient.GetAsync(uri.Uri))
            {
                if (client.IsSuccessStatusCode)
                {
                    var s = await client.Content.ReadAsStringAsync();
                    XmlDocument doc = new XmlDocument();
                    doc.PreserveWhitespace = true;
                    doc.LoadXml(s);

                    var photosetsNodes = doc.SelectNodes("//photo");
                    foreach (XmlNode photosetsNode in photosetsNodes)
                    {
                        Dictionary<PhotoSizeType, Uri> sizeUrls = new Dictionary<PhotoSizeType, Uri>();
                        sizeUrls.Add(PhotoSizeType.SQUARE, new Uri(photosetsNode.Attributes["url_sq"].Value));
                        sizeUrls.Add(PhotoSizeType.THUMBNAIL, new Uri(photosetsNode.Attributes["url_t"].Value));
                        sizeUrls.Add(PhotoSizeType.SMALL, new Uri(photosetsNode.Attributes["url_s"].Value));
                        sizeUrls.Add(PhotoSizeType.MEDIUM, new Uri(photosetsNode.Attributes["url_m"].Value));
                        //sizeUrls.Add(PhotoSizeType.ORIGINAL, new Uri(photosetsNode.Attributes["url_o"].Value));

                        Photo photo = new Photo
                        {
                            ID = photosetsNode.Attributes["id"].Value,
                            Title = photosetsNode.Attributes["title"].Value,
                            Uploaded = DateTimeOffset.FromUnixTimeSeconds(long.Parse(photosetsNode.Attributes["dateupload"].Value)).DateTime,
                            SizeURLs = sizeUrls,
                            Tags = new List<Tag>(Array.ConvertAll(photosetsNode.Attributes["tags"].Value.Split(" "), new Converter<string, Tag>(tag => { return new Tag { ID = tag }; } )))
                        };

                        if (photos.Count < count)
                        {
                            photos.Add(photo);
                        }
                        else
                        {
                            var p = photos.OrderByDescending(photo => photo.Uploaded).FirstOrDefault();
                            
                            if(p.Uploaded < photo.Uploaded)
                            {
                                var index = photos.FindIndex(photo => { return photo.Uploaded == p.Uploaded; });
                                photos.RemoveAt(index);
                                photos.Add(photo);
                            }
                        }
                    }

                }


            }

            return photos;

        }

        public async Task<IList<Tag>> GetTags()
        {
            var tags = new List<Tag>();
            var uri = new UriBuilder(this.baseAddress);
            var query = HttpUtility.ParseQueryString(uri.Query);

            query["method"] = "flickr.tags.getListUser";
            query["user_id"] = this.user;
            query["api_key"] = this.api;
            query["format"] = "rest";

            uri.Query = query.ToString();

            using (var client = await httpClient.GetAsync(uri.Uri))
            {
                if (client.IsSuccessStatusCode)
                {
                    var s = await client.Content.ReadAsStringAsync();
                    XmlDocument doc = new XmlDocument();
                    doc.PreserveWhitespace = true;
                    doc.LoadXml(s);

                    var tagNodes = doc.SelectNodes("//tag");
                    foreach (XmlNode tagNode in tagNodes)
                    {
                        Tag tag = new Tag
                        {
                            ID = tagNode.InnerText
                        };
                        tags.Add(tag);
                    }

                }
            }

            return tags;
        }
    }
}
