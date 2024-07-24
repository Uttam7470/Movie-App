import React from "react";
import Skeleton from "@mui/material/Skeleton";
function SkeletonLayout() {
  return (
    <>
      <div className="skeleton">
        <div className="skeleton-img">
          <Skeleton
            variant="rectangular"
            width={350}
            height={450}
            animation="wave"
            sx={{ bgcolor: "grey.700" }}
          />
        </div>

        <div className="skeleton-line-container">

          <div className="skeleton-line">
            <Skeleton
              variant="text"
              width="100%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
            />
          </div>

          <div className="skeleton-line">
            <Skeleton
              variant="text"
              width="100%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
            />
          </div>

          <div className="skeleton-line">
            <Skeleton
              variant="text"
              width="100%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height="100%"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
            />
          </div>

        </div>

      </div>
    </>
  );
}

export default SkeletonLayout;