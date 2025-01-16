import AttributeConfigureComponent from "@/components/pages/attribute/AttributeConfigureComponent";
import React from "react";

const AttributeConfiguration = ({ params }: { params: { attrId: string } }) => {
  return <AttributeConfigureComponent attributeId={params?.attrId} />;
};

export default AttributeConfiguration;
