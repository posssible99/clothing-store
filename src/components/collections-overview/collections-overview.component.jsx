import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionPreview from "../collection-preview/collection-preview.component";
import "./collections-overview.styles.scss";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {/* This renders each collection preview, like hats,shoes,etc */}
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateProps)(CollectionsOverview);

// I think this component is only getting the data for the other components, is managing that stuff.
// Remember overview: a short description of something that provides general information about it, but no details.
// ! This is th proof that we need to create extensible code.
