import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css"; // Using the shared CSS file

interface Tag {
  id: string;
  name: string;
}

interface UserData {
  email: string;
  userName: string;
  password: string;
  name: string;
  surname: string;
  role: string;
  tags: { id: string }[];
}

const UpdateUserInfo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    userName: "",
    password: "",
    name: "",
    surname: "",
    role: "USER",
    tags: [],
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ id: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.id) {
        try {
          const response = await fetch(
            `http://localhost:4242/api/users/${user.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }
          const data = await response.json();
          setUserData(data);
          setSelectedTags(data.tags);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    const fetchTags = async () => {
      try {
        const response = await fetch(
          "http://localhost:4242/api/tags/level?level=0"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchUserInfo();
    fetchTags();
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagSelection = (tagId: string) => {
    setSelectedTags((prev) => {
      const isTagSelected = prev.find((tag) => tag.id === tagId);
      if (isTagSelected) {
        console.log(`Tag removed from update list: ${tagId}`);
        return prev.filter((tag) => tag.id !== tagId);
      } else {
        console.log(`Tag added to update list: ${tagId}`);
        return [...prev, { id: tagId }];
      }
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalUserData = { ...userData, tags: selectedTags };
    console.log(
      "Final user data being submitted:",
      JSON.stringify(finalUserData)
    );

    try {
      const response = await fetch(
        `http://localhost:4242/api/users/${user?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalUserData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user info");
      }

      alert("User info updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating user info:", error);
      setError("Failed to update user info! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Update User Information</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="surname"
          value={userData.surname}
          onChange={handleInputChange}
          placeholder="Surname"
          required
        />
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <div className="tag-selection">
          <h4>Select Your Interests</h4>
          {tags.map((tag) => (
            <button
              type="button"
              key={tag.id}
              onClick={() => handleTagSelection(tag.id)}
              className={
                selectedTags.some((selectedTag) => selectedTag.id === tag.id)
                  ? "btn btn-success"
                  : "btn btn-outline-success"
              }
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="register-box">
          <button type="submit" className="btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserInfo;
