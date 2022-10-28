// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      name: "customer",
      type: "document",
      title: "Customer",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
        },
        {
          name: "phone",
          type: "string",
          title: "Phone",
        },
        {
          name: "email",
          type: "string",
          title: "Email",
        },
        {
          name: "location",
          type: "string",
          title: "Location",
        },
      ],
    },
    {
      name: "item",
      type: "document",
      title: "Items",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
        },
        {
          name: "item_image",
          type: "image",
          title: "Item Image",
        },
      ],
    },
    {
      name: "event",
      type: "document",
      title: "Events",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
        },
        {
          name: "location",
          type: "string",
          title: "Location",
        },
        {
          name: "date",
          type: "datetime",
          title: "Date",
        },
        {
          name: "image",
          type: "image",
          title: "Image",
        },
        {
          name: "Items",
          type: "array",
          title: "Event Items",
          of: [{ type: "reference", to: [{ type: "item" }] }],
        },
      ],
    },
  ]),
});
