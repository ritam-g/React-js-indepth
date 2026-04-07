
    ┌──────────────────────┐
        │   React Component    │
        │  (App.jsx loaded)    │
        └─────────┬────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │ Initial State Setup  │
        │ images = []          │
        │ page = 1             │
        │ loading = false      │
        │ hasMore = true       │
        └─────────┬────────────┘
                  │
                  ▼
        ┌──────────────────────┐
        │ useEffect(page)      │
        │ → fetchImages()      │
        └─────────┬────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ API Call (Picsum)          │
        │ page=1 → 10 images         │
        └─────────┬──────────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ Update State               │
        │ images = [10 imgs]         │
        └─────────┬──────────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ Render UI                  │
        │ Show images in grid        │
        │ + Loader div at bottom     │
        └─────────┬──────────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ Intersection Observer 👀   │
        │ watching "loader div"      │
        └─────────┬──────────────────┘
                  │
        (User Scrolls ↓↓↓↓↓↓↓↓↓↓↓)
                  │
                  ▼
        ┌────────────────────────────┐
        │ Loader div visible?        │
        │ YES → trigger callback     │
        └─────────┬──────────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ setPage(page + 1)          │
        │ page = 2                   │
        └─────────┬──────────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ useEffect runs again       │
        │ → fetchImages()            │
        └─────────┬──────────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ API Call (page=2)          │
        │ next 10 images             │
        └─────────┬──────────────────┘
                  │
                  ▼
        ┌────────────────────────────┐
        │ Append Images              │
        │ images = old + new         │
        └─────────┬──────────────────┘
                  │
                  ▼
        🔁 LOOP CONTINUES (SCROLL → LOAD → APPEND)

    │
                  ▼
        ┌────────────────────────────┐
        │ No more data?              │
        │ YES → hasMore = false      │
        └────────────────────────────┘
