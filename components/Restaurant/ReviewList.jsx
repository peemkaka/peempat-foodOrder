import Image from "next/image";
import React from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import moment from "moment";
import { Pencil, Trash } from "lucide-react";
function ReviewList({ reviewList, handleDeleteReview, email ,handleEditClick }) {
  return (
    <div className="flex flex-col gap-5">
      {reviewList
        ? reviewList.map((review, index) => {
            return (
              <div
                key={index}
                className="flex justify-between bg-white border-2 rounded-lg p-3"
              >
                <div className="flex flex-1 gap-5 items-center">
                  <Image
                    src={review.profileImage}
                    alt={review.userName}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex flex-col justify-between gap-2 w-full">
                    <h2 className="text-sm">{review.userName}</h2>
                    <ReactRating
                      style={{ maxWidth: 100 }}
                      value={review.star}
                      isDisabled={true}
                    />
                    <h2 className="line-clamp-2">
                      <span className="font-medium">{review.reviewText}</span>{" "}
                      at {moment(review.updatedAt).format("DD-MMM-yyyy")}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-1 relative">
                  <div className="absolute top-2 right-2 flex gap-2">
                    {email && review.email === email && (
                      <>
                        <button
                          title="Edit"
                          onClick={() => handleEditClick(review)}
                          className="text-gray-500 hover:text-green-600"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          title="Delete"
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : [1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="h-[100px] w-full bg-slate-200 animate-pulse rounded-lg"
            />
          ))}
    </div>
  );
}

export default ReviewList;
