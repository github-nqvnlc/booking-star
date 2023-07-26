"use client";
import Container from "@/app/components/Container";
import ListingHeader from "@/app/components/listings/ListingHeader";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import React, { useMemo } from "react";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: SafeListing & { user: SafeUser };
  currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing?.category);
  }, [listing?.category]);

  return (
    <Container>
      <div
        className="
            max-w-screen-lg 
            mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            locationValue={listing?.locationValue}
            id={listing?.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              md:gap-10
              mt-6

            "
          >
            <ListingInfo   
              user={listing?.user}
              category={category}
              description={listing?.description}
              roomCount={listing?.roomCount}
              guestCount={listing?.guestCount}
              bathroomCount={listing?.bathroomCount}
              locationValue={listing?.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;