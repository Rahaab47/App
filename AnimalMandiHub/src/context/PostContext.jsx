import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PostContext = createContext(null);

const POSTS_KEY = 'animalmandihub_posts';

function getPosts() {
  try {
    return JSON.parse(localStorage.getItem(POSTS_KEY)) || [];
  } catch { return []; }
}

function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const stored = getPosts();
    if (stored.length === 0) {
      const defaults = getDefaultPosts();
      savePosts(defaults);
      return defaults;
    }
    return stored;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const addPost = useCallback((post) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          ...post,
          id: Date.now(),
          status: 'active',
          createdAt: new Date().toISOString(),
          views: 0,
          favorites: 0,
        };
        setPosts((prev) => [newPost, ...prev]);
        setLoading(false);
        resolve(newPost);
      }, 400);
    });
  }, []);

  const updatePost = useCallback((id, updates) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deletePost = useCallback((id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorites: (p.favorites || 0) + 1 } : p))
    );
  }, []);

  const incrementViews = useCallback((id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, views: (p.views || 0) + 1 } : p))
    );
  }, []);

  const getPostsByUser = useCallback((userId) => {
    return posts.filter((p) => p.userId === userId);
  }, [posts]);

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost, toggleFavorite, incrementViews, getPostsByUser, loading }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error('usePosts must be used within PostProvider');
  return ctx;
}

function getDefaultPosts() {
  return [
    {
      id: 1, category: 'cow', breed: 'Sahiwal', title: 'Pure Sahiwal Cow - Excellent Milker',
      age: '3 years', weight: '350 kg', gender: 'Female', price: 285000,
      city: 'Lahore', district: 'Gujrat', isVerified: true, isStarAd: true,
      description: 'Pure breed Sahiwal cow, excellent milk producer giving 18-20 liters daily. Well vaccinated and healthy.',
      images: ['https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=600'],
      seller: { name: 'Ahmed Ranch', phone: '03000000000', verified: true, since: '2022' },
      userId: null, status: 'active', createdAt: '2025-07-08T10:00:00Z', views: 245, favorites: 18, milkPerDay: '18-20 liters',
    },
    {
      id: 2, category: 'goat', breed: 'Kamori', title: 'Beautiful Kamori Goat - Rare Breed',
      age: '2 years', weight: '65 kg', gender: 'Male', price: 95000,
      city: 'Karachi', district: 'Korangi', isVerified: true, isStarAd: false,
      description: 'Beautiful Kamori goat with long ears and spotted coat. Very healthy and well-fed. Perfect for Qurbani.',
      images: ['https://images.unsplash.com/photo-1524055988636-436cfa46e59e?w=600'],
      seller: { name: 'Khan Livestock', phone: '03000000000', verified: true, since: '2023' },
      userId: null, status: 'active', createdAt: '2025-07-07T10:00:00Z', views: 182, favorites: 12,
    },
    {
      id: 3, category: 'buffalo', breed: 'Nili Ravi', title: 'Premium Nili Ravi Buffalo',
      age: '4 years', weight: '500 kg', gender: 'Female', price: 350000,
      city: 'Multan', district: 'Multan City', isVerified: true, isStarAd: true,
      description: 'Premium quality Nili Ravi buffalo with exceptional milk yield. Regular vaccinations done.',
      images: ['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600'],
      seller: { name: 'Green Valley Farm', phone: '03000000000', verified: true, since: '2021' },
      userId: null, status: 'active', createdAt: '2025-07-09T10:00:00Z', views: 310, favorites: 25, milkPerDay: '25 liters',
    },
    {
      id: 4, category: 'cow', breed: 'Cholistani', title: 'Cholistani Cow - Desi Breed',
      age: '2.5 years', weight: '280 kg', gender: 'Female', price: 195000,
      city: 'Bahawalpur', district: 'Cholistan', isVerified: false, isStarAd: false,
      description: 'Native Cholistani breed cow, hardy and disease resistant. Good for both milk and breeding.',
      images: ['https://images.unsplash.com/photo-1596733430284-f7437764b1a9?w=600'],
      seller: { name: 'Malik Traders', phone: '03000000000', verified: false, since: '2024' },
      userId: null, status: 'active', createdAt: '2025-07-06T10:00:00Z', views: 98, favorites: 5, milkPerDay: '12 liters',
    },
    {
      id: 5, category: 'goat', breed: 'Beetal', title: 'Large Beetal Goat - Qurbani Ready',
      age: '1.5 years', weight: '55 kg', gender: 'Male', price: 75000,
      city: 'Islamabad', district: 'Rawalpindi', isVerified: true, isStarAd: false,
      description: 'Healthy and large Beetal goat, perfectly suited for Qurbani. Fully vaccinated.',
      images: ['https://images.unsplash.com/photo-1587559070757-f72a388edbba?w=600'],
      seller: { name: 'Rana Farm House', phone: '03000000000', verified: true, since: '2023' },
      userId: null, status: 'active', createdAt: '2025-07-09T12:00:00Z', views: 201, favorites: 15,
    },
    {
      id: 6, category: 'camel', breed: 'Mareecha', title: 'Mareecha Camel - Racing Breed',
      age: '5 years', weight: '450 kg', gender: 'Male', price: 500000,
      city: 'Quetta', district: 'Chagai', isVerified: true, isStarAd: true,
      description: 'Top quality Mareecha camel, trained for racing. Tall, strong, and well-maintained.',
      images: ['https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600'],
      seller: { name: 'Baloch Livestock', phone: '03000000000', verified: true, since: '2020' },
      userId: null, status: 'active', createdAt: '2025-07-08T14:00:00Z', views: 420, favorites: 32,
    },
    {
      id: 7, category: 'sheep', breed: 'Dumba', title: 'Fat-tailed Dumba Sheep Pair',
      age: '1 year', weight: '40 kg each', gender: 'Male', price: 45000,
      city: 'Peshawar', district: 'Charsadda', isVerified: false, isStarAd: false,
      description: 'Pair of healthy Dumba sheep with fat tails. Well-fed on natural grass.',
      images: ['https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=600'],
      seller: { name: 'Pashto Farm', phone: '03000000000', verified: false, since: '2024' },
      userId: null, status: 'active', createdAt: '2025-07-05T10:00:00Z', views: 67, favorites: 3,
    },
    {
      id: 8, category: 'cow', breed: 'Friesian', title: 'HF Friesian Cow - High Yield',
      age: '3 years', weight: '400 kg', gender: 'Female', price: 320000,
      city: 'Faisalabad', district: 'Jhang', isVerified: true, isStarAd: false,
      description: 'Holstein Friesian cross breed, exceptional milk production. Currently giving 25+ liters per day.',
      images: ['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600'],
      seller: { name: 'Dairy Prime Farm', phone: '03000000000', verified: true, since: '2022' },
      userId: null, status: 'active', createdAt: '2025-07-09T08:00:00Z', views: 289, favorites: 21, milkPerDay: '25+ liters',
    },
    {
      id: 9, category: 'bird', breed: 'Aseel', title: 'Shamo Aseel Murga - Fighting Champion',
      age: '2 years', weight: '5 kg', gender: 'Male', price: 35000,
      city: 'Lahore', district: 'Sheikhupura', isVerified: true, isStarAd: false,
      description: 'Champion bloodline Shamo Aseel rooster. Tall, aggressive fighter with winning record.',
      images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600'],
      seller: { name: 'Aseel King', phone: '03000000000', verified: true, since: '2023' },
      userId: null, status: 'active', createdAt: '2025-07-07T09:00:00Z', views: 156, favorites: 9,
    },
    {
      id: 10, category: 'goat', breed: 'Teddy', title: 'Cute Teddy Goat - Mini Breed',
      age: '8 months', weight: '20 kg', gender: 'Male', price: 30000,
      city: 'Rawalpindi', district: 'Taxila', isVerified: false, isStarAd: false,
      description: 'Adorable Teddy goat, perfect as a pet or for small-scale farming. Very friendly.',
      images: ['https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600'],
      seller: { name: 'Ali Pets', phone: '03000000000', verified: false, since: '2025' },
      userId: null, status: 'active', createdAt: '2025-07-09T11:00:00Z', views: 88, favorites: 7,
    },
    {
      id: 11, category: 'cow', breed: 'Jersey', title: 'Jersey Cow - Rich Milk',
      age: '4 years', weight: '320 kg', gender: 'Female', price: 250000,
      city: 'Sialkot', district: 'Wazirabad', isVerified: true, isStarAd: false,
      description: 'Pure Jersey cow with high butterfat milk. Docile temperament, easy to handle.',
      images: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600'],
      seller: { name: 'Sialkot Dairy', phone: '03000000000', verified: true, since: '2021' },
      userId: null, status: 'active', createdAt: '2025-07-08T16:00:00Z', views: 174, favorites: 11, milkPerDay: '15 liters',
    },
    {
      id: 12, category: 'buffalo', breed: 'Kundi', title: 'Kundi Buffalo - Desert Breed',
      age: '3 years', weight: '420 kg', gender: 'Female', price: 310000,
      city: 'Sukkur', district: 'Larkana', isVerified: true, isStarAd: true,
      description: 'Hardy Kundi buffalo from Sindh. Excellent milk producer adapted to hot climate.',
      images: ['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600'],
      seller: { name: 'Sindh Livestock', phone: '03000000000', verified: true, since: '2022' },
      userId: null, status: 'active', createdAt: '2025-07-09T07:00:00Z', views: 265, favorites: 19, milkPerDay: '20 liters',
    },
  ];
}
