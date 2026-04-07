import { useEffect, useRef, useState } from "react";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef(null);

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
        setHasMore(false); // stop when no data
      } else {
        setImages((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }

    setLoading(false);
  };

  // 🔥 Call API when page changes
  useEffect(() => {
    fetchImages();
  }, [page]);

  // 🔥 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loader.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loading]);

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
      <div ref={loader} style={{ textAlign: "center", padding: "20px" }}>
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more images 🚫</p>}
      </div>
    </div>
  );
}