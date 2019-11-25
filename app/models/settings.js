import DS from "ember-data";

export default DS.Model.extend({
  user: DS.belongsTo("user"),
  pencil_thickness: DS.attr("number", { defaultValue: 1 }),
  pencil_pressure_sensitivity: DS.attr("number", { defaultValue: 8 }),
  eraser_thickness: DS.attr("number", { defaultValue: 20 }),
  annotation_options: DS.attr("boolean", { defaultValue: true })
});
