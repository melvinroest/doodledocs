import DS from "ember-data";

// Some boilerplate that I find handy to have
// export default DS.Model.extend({
//   lineItems: DS.hasMany("line-item"),
//   firstName: DS.attr("string"),
//   birthday: DS.attr("date", { defaultValue: new Date() }),
//   firstName: DS.attr(),
//   lastName: DS.attr(),

//   fullName: computed("firstName", "lastName", function() {
//     return `${this.firstName} ${this.lastName}`;
//   })
// });

export default DS.Model.extend({
  settings: DS.belongsTo("settings"),
  fullname: DS.attr("string"),
  username: DS.attr("string"),
  email: DS.attr("string"),
  email_confirmation: DS.attr("string"),
  password: DS.attr("string"),
  email_opt_out: DS.attr("boolean")
});
