using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using cieclarke.Lib;

namespace cieclarke.Lib
{
    public interface IBlogItem
    {
        string Title { get; set; }
        string ID { get; set; }
        string Data { get; set; }
    }    
}