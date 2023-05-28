// Copyright (C) 2022-present Daniel31x13 <daniel31x13@gmail.com>
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import useCollectionStore from "@/store/collections";
import { CollectionIncludingMembers, Member } from "@/types/global";
import { useSession } from "next-auth/react";
import Modal from "@/components/Modal";
import DeleteCollection from "@/components/Modal/Collection/DeleteCollection";
import RequiredBadge from "../../RequiredBadge";
import addMemberToCollection from "@/lib/client/addMemberToCollection";
import ImageWithFallback from "../../ImageWithFallback";
import Checkbox from "../../Checkbox";

type Props = {
  toggleCollectionModal: Function;
  activeCollection: CollectionIncludingMembers;
  method: "CREATE" | "UPDATE";
};

export default function CollectionInfo({
  toggleCollectionModal,
  activeCollection,
  method,
}: Props) {
  const [collection, setCollection] =
    useState<CollectionIncludingMembers>(activeCollection);

  const { updateCollection, addCollection } = useCollectionStore();

  const submit = async () => {
    if (!collection) return null;

    let response = null;

    if (method === "CREATE") response = await addCollection(collection);
    else if (method === "UPDATE") response = await updateCollection(collection);
    else console.log("Unknown method.");

    if (response) toggleCollectionModal();
  };

  return (
    <div className="flex flex-col gap-3 sm:w-[35rem] w-80">
      <p className="text-xl text-sky-500 mb-2 text-center">
        {method === "CREATE" ? "Add" : "Edit"} Collection
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full">
          <p className="text-sm font-bold text-sky-300 mb-2">
            Name
            <RequiredBadge />
          </p>
          <input
            value={collection.name}
            onChange={(e) =>
              setCollection({ ...collection, name: e.target.value })
            }
            type="text"
            placeholder="e.g. Example Collection"
            className="w-full rounded-md p-3 border-sky-100 border-solid border outline-none focus:border-sky-500 duration-100"
          />
        </div>

        <div className="w-full">
          <p className="text-sm font-bold text-sky-300 mb-2">Description</p>
          <textarea
            className="w-full h-40 resize-none border rounded-md duration-100 bg-white p-3 outline-none border-sky-100 focus:border-sky-500"
            placeholder="The purpose of this Collection..."
            value={collection.description}
            onChange={(e) =>
              setCollection({
                ...collection,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 mt-2">
        <div
          className="bg-sky-500 text-white flex items-center gap-2 py-2 px-5 rounded-md select-none font-bold cursor-pointer duration-100 hover:bg-sky-400"
          onClick={submit}
        >
          <FontAwesomeIcon
            icon={method === "CREATE" ? faPlus : faPenToSquare}
            className="h-5"
          />
          {method === "CREATE" ? "Add Collection" : "Edit Collection"}
        </div>
      </div>
    </div>
  );
}
