using System;
using System.Collections.Generic;
using cieclarke.Lib;
using Microsoft.AspNetCore.Mvc;

namespace cieclarke.Models
{
    public class Tag : IPhotographyItem
    {
        public Tag()
        {
            Type = PhotographyType.TAG;
        }

        public string ID { get; set; }
        public PhotographyType Type { get; private set; }
    }
}