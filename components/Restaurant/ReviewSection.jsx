"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../../utils/GlobalApi";
import ReviewList from "../../components/Restaurant/ReviewList";
import { toast } from "sonner";

function ReviewSection({ restaurant }) {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewList, setReviewList] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        getReviewList();
    }, [restaurant]);

    const handleSubmit = () => {
        const data = {
            email: user.primaryEmailAddress.emailAddress,
            profileImage: user?.imageUrl,
            userName: user?.fullName,
            star: rating,
            reviewText: reviewText,
            RestroSlug: restaurant.slug,
        };

        GlobalApi.AddNewReview(data)
            .then((resp) => {
                console.log(resp);
                toast("Review Added!");
                setRating(0); // Reset rating
                setReviewText(""); // Reset review text
                getReviewList(); // Refresh the review list
            })
            .catch((error) => {
                console.error("Error adding review:", error);
                toast.error("Failed to add review");
            });
    };

    const getReviewList = () => {
        GlobalApi.GetRestaurantReviews(restaurant.slug)
            .then((resp) => {
                console.log('API Response:', resp);
                setReviewList(resp?.reviews || []); // Fallback to empty array if no reviews
            })
            .catch((error) => {
                console.error("Error fetching reviews:", error);
            });
    };
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
            <div className="flex flex-col gap-2 p-3 rounded-xl border-2 shadow-2xl">
                <h2 className="font-bold text-lg">Add your review</h2>
                <ReactRating
                    style={{ maxWidth: 100 }}
                    value={rating}
                    onChange={setRating}
                />
                <Textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
                {user&&<Button
                    disabled={rating === 0 || !rating}
                    onClick={handleSubmit}
                    className="bg-primary text-white hover:bg-primary/80 font-bold"
                >
                    Submit
                </Button>}
            </div>
            <div className="col-span-2">
                <ReviewList reviewList={reviewList} />
            </div>
        </div>
    );
}

export default ReviewSection;
