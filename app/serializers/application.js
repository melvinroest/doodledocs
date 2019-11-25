import RESTSerializer from "@ember-data/serializer/rest";
import { underscore } from "@ember/string";

export default RESTSerializer.extend({
  // normalize(model, hash, prop) {
  //   // console.log("normalize", model, hash, prop);
  //   // console.log(this);
  //   // this.store().findRecord
  //   hash = { user: hash };
  //   console.log("normalize", hash);
  //   return hash;
  // }
  // normalizeResponse(store, schema, rawPayload) {
  //   return rawPayload;
  // }
  // serialize(snapshot, options) {
  //   const json = this._super(snapshot, options);
  //   return json;
  // }
  // serializeIntoHash(data, type, record, options) {
  //   var root = decamelize(type.modelName);
  //   data[root] = this.serialize(record, options);
  // }
});
