using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using cieclarke.Lib;

namespace cieclarke.Models
{
    public class BlogItem : IBlogItem
    {
        public string Title { get; set; }
        public string ID { get; set; }
        public string Data { get; set; }
    }    
}