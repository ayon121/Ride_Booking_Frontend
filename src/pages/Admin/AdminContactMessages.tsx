import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// Skeleton component for contact message
const ContactSkeletonCard = () => (
  <div className="bg-muted p-4 rounded-2xl shadow-md border border-orange-200 animate-pulse">
    <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-3 bg-gray-300 rounded w-1/3 mt-2"></div>
  </div>
);

const AdminContactMessages = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axiosInstance.get("/contact");
        setContacts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        Contact Messages
      </h1>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ContactSkeletonCard key={idx} />
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-muted p-4 rounded-2xl shadow-md border border-orange-200"
            >
              <h2 className="text-lg font-semibold text-orange-600">
                {contact.name}
              </h2>
              <p className="text-sm text-foreground">{contact.email}</p>
              <p className="mt-2 text-foreground">{contact.message}</p>
              <p className="mt-3 text-xs text-foreground">
                {new Date(contact.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
