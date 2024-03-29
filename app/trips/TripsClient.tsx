"use client";

import React from "react";
import { SafeReservation, SafeUser } from "../types";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = React.useState("");

  const onCancel = React.useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled!");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <ClientOnly>
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going"
        />
        <div
          className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deleteId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default TripsClient;
