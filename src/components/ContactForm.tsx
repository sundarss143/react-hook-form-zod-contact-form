import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { contactSchema } from "../schemas/contactSchema";
import type { ContactFormData } from "../schemas/contactSchema";

const ContactForm = () => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // 🔥 API call
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);

      // ✅ Success UI
      toast.success("Message sent successfully!");
      setSuccess(true);
      reset();

      // ⏱ Auto-hide success message
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-center">
            Form submitted successfully!
          </p>
        )}

        {/* Helper Text */}
        <p className="text-gray-500 text-center text-sm">
          We’ll get back to you within 24 hours
        </p>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Contact Form
        </h2>

        {/* Name */}
        <div>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {String(errors.email.message)}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            {...register("message")}
            placeholder="Message"
            rows={4}
            className="w-full border p-2 rounded"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">
              {String(errors.message.message)}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;