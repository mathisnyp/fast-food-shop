import React from "react"
import { useAppSelector } from "../../store/hooks"

export function ProfileView() {
  const user = useAppSelector((state) => state.user.loggedInUser)

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
      }}
    >
      <div>
        <div>
          {user?.firstname} {user?.lastname}
        </div>
        <div>{user?.street}</div>
        <div>
          {user?.postcode}, {user?.city}
        </div>
        <div>{user?.country}</div>
      </div>
      <div>
        <label style={{ fontWeight: 500 }}>E-Mail:</label> {user?.email}
      </div>
      <div>
        <label style={{ fontWeight: 500 }}>Phone-number:</label> {user?.phone}
      </div>
    </div>
  )
}
