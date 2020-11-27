using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using cieclarke.Models;
using Microsoft.AspNetCore.Mvc;

namespace cieclarke.Lib
{
    public interface IBlogService
    {
        Task<IList<BlogItem>> GetLinks();
    }

}