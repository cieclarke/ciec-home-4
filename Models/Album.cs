using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using cieclarke.Lib;

namespace cieclarke.Models
{
    public class Album : IPhotographyItem
    {
        public Album()
        {
            Type = PhotographyType.ALBUM;
        }

        public string ID { get; set; }
        public PhotographyType Type { get; private set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }    
}