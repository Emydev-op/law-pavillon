"use client";
import CustomTable from "@/components/custom/custom-table";
import FilterBarInput from "@/components/custom/filter-bar-input";
import { splitISODateTime } from "@/utils/helpers";
import React, { useEffect, useState } from "react";

export default function ActivityLog() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);

      return () => {
        setLoading(false);
      };
    }, 2000);
  }, []);

  return (
    <section className="px-5 pt-5">
      <section className="bg-white w-full px-6 py-5 rounded-xm">
        <FilterBarInput
          title="All Users"
          desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit."
          containerClass="mb-5 mt-2.5"
        />
        <CustomTable
          tableheaderList={["Date", "Admin User", "Module", "Change", "Action"]}
          tableBodyList={FORMAT_TABLE_DATA(dummyData)}
          loading={loading}
          currentPage={3}
          totalPage={9}
          // actionButton="View"
          // actionButtonOnClick={(param) => {
          //   console.log(param);
          // }}
          dropDown
          dropDownList={[
            {
              label: "View Details",
              color: "",
              onActionClick: () => {},
            },
          ]}
        />
      </section>
    </section>
  );
}

const FORMAT_TABLE_DATA = (obj: typeof dummyData) => {
  return obj?.map((org) => ({
    date: (
      <span>
        <span className="text-[10px] font-medium">
          {splitISODateTime(org.datetime).date}
        </span>
        <p className="text-[9px] text-black-02">
          {splitISODateTime(org.datetime).time}
        </p>
      </span>
    ),
    admin: (
      <span>
        <span className="text-[12px]">{org.adminUser.name}</span>
        <p className="text-[10px] text-black-02">{org.adminUser.email}</p>
      </span>
    ),
    module: org?.module || "---",
    change: <p className="text-black-02">{org?.change || "---"}</p>,
  }));
};

const dummyData = [
  {
    datetime: "2024-04-20T22:32:00Z",
    adminUser: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      role: "Super Admin",
    },
    module: "Customer Management",
    customerAccount: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      id: "2345",
    },
    change: "Viewed customer profile",
  },
  {
    datetime: "2024-04-20T22:32:00Z",
    adminUser: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      role: "Super Admin",
    },
    module: "Customer Management",
    customerAccount: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      id: "2345",
    },
    change: "Edited customer details",
  },
  {
    datetime: "2024-04-20T22:32:00Z",
    adminUser: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      role: "Super Admin",
    },
    module: "Customer Management",
    customerAccount: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      id: "2345",
    },
    change: "Suspended customer account",
  },
  {
    datetime: "2024-04-20T22:32:00Z",
    adminUser: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      role: "Super Admin",
    },
    module: "Customer Management",
    customerAccount: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      id: "2345",
    },
    change: "Updated customer transaction status",
  },
  {
    datetime: "2024-04-20T22:32:00Z",
    adminUser: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      role: "Super Admin",
    },
    module: "Customer Management",
    customerAccount: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      id: "2345",
    },
    change: "Viewed customer profile",
  },
  {
    datetime: "2024-04-20T22:32:00Z",
    adminUser: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      role: "Super Admin",
    },
    module: "Customer Management",
    customerAccount: {
      name: "Abraham John",
      email: "abrahjohnjohn@gmail.com",
      id: "2345",
    },
    change: "Viewed customer profile",
  },
];
