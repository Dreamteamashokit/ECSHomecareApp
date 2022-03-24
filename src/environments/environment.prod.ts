export const environment = {
  production: true,
  domain2 : "http://eshomecareapi-dev.us-east-1.elasticbeanstalk.com",
  domain : "https://localhost:44359",
  //domain : "https://api.eshcs.com",
  //domainLocal : "https://localhost:44359",
  /* Login API URL */
  loginurl : "/api/Login/validateuserlogin/",
  UploadFileUrl:"/api/Common/UploadFile",
  /* */

  /* Employee API URL */
  saveempurl : "/api/Employee/savenewemployeeinfo",
  getempurl : "/api/Employee/getemployeelist",
  deleteemployeeurl : "/api/Employee/deleteemployee/",

  /* */

   /* Client API URL */
   saveclienturl : "/api/Client/savenewclientinfo",
   getclienturl : "/api/Client/getclientlist",
   getclientmeetingsurl : "/api/Client/getclientmeetings",
   savescheduledclientmeeting : "/api/Client/scheduleclientmeeting",
   /* */

   /* Invoice API URL */
   generateinvoiceurl : "/api/Invoice/generateinvoice",
   getinvoicelisturl : "/api/Invoice/getinvoicelist",
   getinvoicebyidurl : "/api/Invoice/getinvoicebyid",
   payinvoicebyidurl : "/api/Invoice/payinvoice",
   /* */
};
