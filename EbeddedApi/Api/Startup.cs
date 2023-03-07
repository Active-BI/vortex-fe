using Microsoft.OpenApi.Models;
using EmbeddedApi.Models;
using EmbeddedApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using EbeddedApi.Services;
using EbeddedApi.Models.Auth;
using Microsoft.AspNetCore.Identity;
using EbeddedApi.Models;
using System.Text;
using EbeddedApi.Context;
using Repository.Interfaces;
using Repository.Concretes;

namespace EmbeddedApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment _env { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<UserPbiRlsContext>(options => options.UseNpgsql(Configuration.GetConnectionString("PostgresConnection")));
            services.AddDbContext<IdentityContext>(options => options.UseNpgsql(Configuration.GetConnectionString("PostgresConnection")));

            //   IConfigurationManager<OpenIdConnectConfiguration> configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>($"{"https://wfs-ish.ish.com.br/adfs/"}.well-known/openid-configuration", 
            //         new OpenIdConnectConfigurationRetriever());
            //     OpenIdConnectConfiguration openIdConfig = AsyncHelper.RunSync(async () => await configurationManager.GetConfigurationAsync(CancellationToken.None));

            services.AddAuthentication(x =>
                                    {
                                        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                                        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                                    })
                    .AddJwtBearer(options =>
                    {
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = false,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                                .GetBytes(Configuration.GetSection("JWT:secretKey").Value)),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });
            IdentityBuilder builder = services.AddIdentityCore<User>(options =>
      {
          options.Password.RequireDigit = true;
          options.Password.RequireNonAlphanumeric = true;
          options.Password.RequireLowercase = true;
          options.Password.RequireUppercase = true;
          options.Password.RequiredLength = 4;
      });

            builder.Services.AddAuthorization(options =>
                {
                    options.AddPolicy("ADMIN", policy =>
                                    policy.RequireClaim("perfil", "ADMIN"));
                });


            // Injeta as dependecias na controller
            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            builder.AddEntityFrameworkStores<IdentityContext>();
            builder.AddRoleValidator<RoleValidator<Role>>();
            builder.AddRoleManager<RoleManager<Role>>();
            builder.AddSignInManager<SignInManager<User>>();

            // Register AadService and PbiEmbedService for dependency injection
            services.AddScoped(typeof(AadService))
                    .AddScoped(typeof(PbiEmbedService))
                    .AddScoped(typeof(ReportExportService))
                    .AddScoped(typeof(TokenService))
                    .AddScoped(typeof(JwtService))
                    .AddScoped(typeof(AuthService))
                    .AddScoped(typeof(AdminService))
                    .AddScoped(typeof(VisionService));

            services.AddScoped<IUserPbiRlsRepository, UserPbiRlsRepository>();
            services.AddScoped<IRolesRepository, RolesRepository>();
            services.AddScoped<IVisionRepository, VisionRepository>();
            services.AddScoped<IDatabaseFuncions, DatabaseFuncions>();
            services.AddScoped<IIdentityRepository, IdentityRepository>();

            // Loading appsettings.json in C# Model classes
            services.Configure<AzureAd>(Configuration.GetSection("AzureAd"))
                    .Configure<PowerBI>(Configuration.GetSection("PowerBI"))
                    .Configure<RecaptchaConfig>(Configuration.GetSection("Recaptcha"));

            services.AddCors();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ActiveEmbedded", Version = "v1" });
            });

            services.UpgradePasswordSecurity().UseBcrypt<User>();

            // Clients Configurations
            services.AddHttpClient();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EbeddedApi v1"));
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
                //app.UseCors(x => x.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());
                // app.UseCors(x => x.WithOrigins("https://app-winservice.herokuapp.com/").AllowAnyMethod().AllowAnyHeader());

            }
            else
            {
                app.UseHsts();

                // app.UseCors(x => x.WithOrigins("https://app-embedded.herokuapp.com/").WithMethods("GET","OPTION").AllowAnyHeader());
                app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            }

            // Desabilitado para não subir servidor de arquivos kestrel app.UseDefaultFiles();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}