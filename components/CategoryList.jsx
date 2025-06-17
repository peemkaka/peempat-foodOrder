"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GlobalApi from "../utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

const CategoryList = () => {
    const listRef = useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    const params = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        setSelectedCategory(params.get("category"));
    }, [params]);

    useEffect(() => {
        getCategoryList();
    }, []);

    const ScrollRightHandle = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
            });
        }
    };
    const ScrollLeftHandle = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: -200,
                behavior: "smooth",
            });
        }
    };

    const getCategoryList = async () => {
        try {
            const res = await fetch('/api/category');
            const resp = await res.json();
            setCategoryList(resp.categories);
        } catch (error) {
            setCategoryList([]);
        }
    };

    return (
        <div className="w-full h-auto relative container">
            <div className="flex gap-4 p-8 overflow-auto scrollbar-hide" ref={listRef}>
                {categoryList &&
                    categoryList.map((category, index) => (
                        <Link
                            href={"?category=" + category.slug}
                            key={index}
                            className={`flex flex-col justify-center items-center border-2 
                 hover:bg-accent-HOVER hover:border-primary gap-4 rounded-2xl shadow-lg p-3 h-[120px] min-w-28 relative
                 cursor-pointer group
                 ${
                     selectedCategory === category.slug
                         ? "text-primary border-primary bg-accent-HOVER"
                         : "bg-white border-transparent"
                 }
                 `}
                        >
                            <Image
                                src={category.icon?.url}
                                alt={category.name}
                                width={80}
                                height={80}
                                className="group-hover:scale-125 transition-all duration-200"
                            />
                            <h2 className="group-hover:text-primary absolute -bottom-1 font-bold">
                                {category.name}
                            </h2>
                        </Link>
                    ))}
                <button onClick={ScrollRightHandle} className="hidden xl:flex">
                    <ArrowRightCircle className="absolute -right-10 my-auto bg-gray-500 rounded-full text-white top-20 h-8 w-8 cursor-pointer" />
                </button>
                <button onClick={ScrollLeftHandle} className="hidden xl:flex">
                    <ArrowLeftCircle className="absolute -left-16 my-auto bg-gray-500 rounded-full text-white top-20 h-8 w-8 cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

const WrappedCategoryList = () => (
    <Suspense fallback={<div>Loading categories...</div>}>
        <CategoryList />
    </Suspense>
);

export default WrappedCategoryList;
