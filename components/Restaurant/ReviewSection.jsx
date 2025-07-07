"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import ReviewList from "../../components/Restaurant/ReviewList";
import { toast } from "sonner";

function ReviewSection({ restaurant }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const [editId, setEditId] = useState(null); // id ของ review ที่กำลังแก้ไข
  const { user } = useUser();

  useEffect(() => {
    getReviewList();
  }, [restaurant]);

  const handleSubmit = async () => {
    if (!user) return;
    const data = {
      email: user.primaryEmailAddress.emailAddress,
      profileImage: user?.imageUrl,
      userName: user?.fullName,
      star: rating,
      reviewText: reviewText,
      RestroSlug: restaurant.slug,
    };

    try {
      const res = await fetch(`/api/review/${restaurant.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast("Review Added!");
        // Optimistic update
        setReviewList((prev) => [
          {
            ...data,
            id: Math.random().toString(), // temp id
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);
        setRating(0);
        setReviewText("");
        // sync กับ backend อีกครั้งหลัง 500ms
        setTimeout(getReviewList, 500);
      } else {
        toast.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    }
  };

  const getReviewList = useCallback(async () => {
    try {
      const res = await fetch(`/api/review/${restaurant.slug}`);
      const resp = await res.json();
      setReviewList(resp?.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [restaurant.slug]);

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await fetch(`/api/review/${restaurant.slug}?id=${reviewId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast("Review Deleted!");
        // Optimistic update
        setReviewList((prev) => prev.filter((r) => r.id !== reviewId));
        // sync กับ backend อีกครั้งหลัง 500ms
        setTimeout(getReviewList, 500);
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  // ----------- ฟังก์ชันสำหรับแก้ไขคอมเมนต์ -----------
  const handleEditClick = (review) => {
    setEditId(review.id);
    setReviewText(review.reviewText);
    setRating(review.star);
  };

  const handleEditCancel = () => {
    setEditId(null);
    setReviewText("");
    setRating(0);
  };

  const handleEditConfirm = async () => {
    if (!editId) return;
    try {
      const res = await fetch(
        `/api/review/${restaurant.slug}?id=${editId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviewText,
            star: rating,
          }),
        }
      );
      if (res.ok) {
        toast("Review Updated!");
        // Optimistic update
        setReviewList((prev) =>
          prev.map((r) =>
            r.id === editId ? { ...r, reviewText, star: rating } : r
          )
        );
        setEditId(null);
        setReviewText("");
        setRating(0);
        // sync กับ backend อีกครั้งหลัง 500ms
        setTimeout(getReviewList, 500);
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      toast.error("Failed to update review");
    }
  };
  // -----------------------------------------------

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
      <div className="flex flex-col sticky top-0 self-start gap-2 p-3 rounded-xl border-2 shadow-2xl">
        <h2 className="font-bold text-lg">
          {editId ? "Edit your review" : "Add your review"}
        </h2>
        <ReactRating
          style={{ maxWidth: 100 }}
          value={rating}
          onChange={setRating}
        />
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        {user && (
          editId ? (
            <div className="flex gap-2">
              <Button
                onClick={handleEditConfirm}
                disabled={rating === 0 || !reviewText}
                className="bg-primary text-white hover:bg-primary/80 font-bold"
              >
                Save
              </Button>
              <Button
                onClick={handleEditCancel}
                variant="outline"
                className="font-bold"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              disabled={rating === 0 || !reviewText}
              onClick={handleSubmit}
              className="bg-primary text-white hover:bg-primary/80 font-bold"
            >
              Submit
            </Button>
          )
        )}
      </div>
      <div className="col-span-2 max-h-[600px] overflow-auto">
        <ReviewList
          handleDeleteReview={handleDeleteReview}
          handleEditClick={handleEditClick}
          reviewList={reviewList}
          email={user?.primaryEmailAddress?.emailAddress}
        />
      </div>
    </div>
  );
}

export default ReviewSection;
