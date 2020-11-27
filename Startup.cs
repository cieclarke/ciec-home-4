using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using cieclarke.Lib;
using System.Net.Http;

namespace cieclarke
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddControllersWithViews();
            services.AddHttpClient("FlickrService", c => { c.BaseAddress = new System.Uri(Configuration["FLICKR_URI"]); } );
            services.AddHttpClient("TumblrService", c => { c.BaseAddress = new System.Uri(Configuration["TUMBLR_URI"]); });

            services.AddScoped<IPhotoService>(c =>
            {
                var clientFactory = c.GetRequiredService<IHttpClientFactory>();
                var httpClient = clientFactory.CreateClient("FlickrService");

                return new FlickrService(httpClient, Configuration["FLICKR_API"], Configuration["FLICKR_USER"]);
            });

            services.AddScoped<IBlogService>(c =>
            {
                var clientFactory = c.GetRequiredService<IHttpClientFactory>();
                var httpClient = clientFactory.CreateClient("TumblrService");

                return new TumblrService(httpClient, Configuration["TUMBLR_API"]);

            });

         

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        { 
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "recent",
                    pattern: "Flickr/RecentPhotos/count",
                    defaults: new { controller = "Flickr", action = "RecentPhotos"  }
                );

                endpoints.MapControllerRoute(
                    name: "albumPhotos",
                    pattern: "Flickr/Photos/{albumId?}",
                    defaults: new { controller = "Flickr", action = "Photos" }
                );

                endpoints.MapControllerRoute(
                    name: "links",
                    pattern: "Tumblr/Links/",
                    defaults: new { controller = "Tumblr", action = "Links" }
                );

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");

            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
