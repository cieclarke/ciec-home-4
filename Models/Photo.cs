using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using cieclarke.Lib;

namespace cieclarke.Models
{
    public class Photo : IPhotographyItem
    {
        public Photo()
        {
            Type = PhotographyType.PHOTO;
        }

        public string Title { get; set; }
        public string ID { get; set; }
        public PhotographyType Type { get; private set; }
        public IList<Tag> Tags { get; set; }
        public IDictionary<PhotoSizeType, Uri> SizeURLs { get; set; }
        public DateTime Uploaded { get; set; }
    }    
}