import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductSkeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      <Skeleton height={200} />
      <Skeleton width={`80%`} height={20} style={{ margin: "10px 0" }} />
      <Skeleton width={`60%`} height={20} />
      <Skeleton width={`40%`} height={20} />
    </div>
  );
};

export default ProductSkeleton;
