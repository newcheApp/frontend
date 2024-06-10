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

const SignUpForm = () => {
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
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4242/api/tags/level?level=0")
      .then((response) => response.json())
      .then(setTags)
      .catch(console.error);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagSelection = (tagId: string) => {
    setSelectedTags((prev) => {
      const isTagSelected = prev.find((tag) => tag.id === tagId);
      if (isTagSelected) {
        console.log(`Tag removed from sign-up list: ${tagId}`);
        return prev.filter((tag) => tag.id !== tagId);
      } else {
        console.log(`Tag added to sign-up list: ${tagId}`);
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
      const response = await fetch("http://localhost:4242/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalUserData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const registeredUser = await response.json();
      alert("Registration successful!");

      // Auto sign-in after registration
      signIn(registeredUser);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
