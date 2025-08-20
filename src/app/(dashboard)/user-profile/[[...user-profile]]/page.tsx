import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <div className="p-4">
      <UserProfile />
    </div>
  );
}
