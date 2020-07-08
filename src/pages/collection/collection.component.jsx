import React from "react";
import "./collection.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={items.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// The second parameter, are the properties of this component.
const mapStateProps = (state, ownProps) => ({
  // Here we pass the state, because the selector need both, it returns a function that need the state.Normally we only do this selectCollection(state).
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateProps)(CollectionPage);
