import React, { useEffect, useState } from "react";

function Home() {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("https://reqres.in/api/users");
        const data = await res.json();
        setUsers(data.data);
        setFilteredUsers(data.data); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(query) ||
        user.last_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <>
      {!users.length ? (
        <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
          Loading ...
        </h1>
      ) : (
        <>
          <section className="p-8 max-w-7xl mx-auto">
            <h1 className="flex items-center justify-center text-white text-center mb-5 px-5 text-5xl font-bold">
              User List
            </h1>
            <form className="max-w-xl mx-auto">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for user"
                className="py-2 px-4 rounded shadow w-full"
                value={search}
                onChange={handleSearch}
              />
            </form>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-4 my-10 lg:my-20">
              {filteredUsers.map((user) => (
                <article key={user.id} className="bg-slate-600 p-4 rounded">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name}'s avatar`}
                    className="rounded w-full object-cover"
                  />
                  <h3 className="text-white text-lg font-bold mt-4 mb-2">
                    Name : {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-slate-400">
                    Email: <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                </article>
              ))}
              {filteredUsers.length === 0 && (
                <p className="text-white text-center col-span-full">
                  No users found.
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Home;
