import { useEffect, useRef, useState } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  // 🔥 Fetch Images
  const fetchImages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=10`
      );
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {

        // Use functional update to avoid stale state
        setImages((prevImages) => [...prevImages, ...data]);
        console.log('====================================');
        console.log(images.length);
        console.log('====================================');
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Call API when page changes
  useEffect(() => {
    fetchImages();
  }, [page]);

  // 🔥 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, { threshold: 1 });

    const loaderDiv = loaderRef.current;

    if (loaderDiv) {
      observer.observe(loaderDiv);
    }
    // this will run when the new observer call 
    // ✅ Key takeaway:

    //! Even though your useEffect has a return function with observer.unobserve,
    //!  it does not immediately remove observation. 
    //! It only executes before the next effect runs or when the component unmounts. 
    //! Meanwhile, your observer is actively watching the loader and triggers the callback when visible.
    return () => {
      if (loaderDiv) {
        observer.unobserve(loaderDiv);
      }
    };
  }, [loading, hasMore]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Infinite Scroll Images 🚀</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.download_url}
            alt="random"
            loading="lazy"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        ))}
      </div>

      {/* Loader */}
      <div ref={loaderRef} style={{ textAlign: "center", padding: "20px" }}>
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more images 🚫</p>}
      </div>
    </div>
  );
}