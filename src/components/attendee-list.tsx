import { ChangeEvent, useEffect, useRef, useState } from "react";
import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";

import { attendees } from "../data/attendees";

export function AttendeeList() {
  const offset = 10;
  const lastPage = Math.ceil(attendees.length / offset);

  const hasPaginationBeenRendered = useRef(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);
  const [minPaginationValues, setMinPaginationValues] = useState(1);
  const [maxPaginationValues, setMaxPaginationValues] = useState(offset);

  useEffect(() => {
    if (hasPaginationBeenRendered.current) {
      setMinPaginationValues((pagination - 1) * offset);
      setMaxPaginationValues(pagination * offset);
    }
    hasPaginationBeenRendered.current = true;
  }, [pagination]);

  // Search
  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  // Pagination
  function goToFirstPage() {
    if (pagination > 1) {
      setPagination(1);
    }
  }

  function goToPreviousPage() {
    if (pagination > 1) {
      setPagination((current) => current - 1);
    }
  }

  function goToNextPage() {
    if (pagination < lastPage) {
      setPagination((current) => current + 1);
    }
  }

  function goToLastPage() {
    if (pagination < lastPage) {
      setPagination(lastPage);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Attendees</h1>
        <div className="flex items-center w-72 px-3 py-1.5 border border-white/10 rounded-lg gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChange}
            className="flex-1 bg-transparent outline-none border-0 p-0 text-sm"
            placeholder="Search attenddee"
          />
        </div>

        {search}
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Code</TableHeader>
            <TableHeader>Attendee</TableHeader>
            <TableHeader>Registration</TableHeader>
            <TableHeader>Check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees
            .slice(minPaginationValues, maxPaginationValues)
            .map((attendee) => (
              <TableRow
                key={attendee.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10"
                  />
                </TableCell>
                <TableCell>{attendee.code}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDistance(attendee.createdAt, new Date(), {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  {formatDistance(attendee.checkedInAt, new Date(), {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
              Showing 10 of {attendees.length} items
            </TableCell>
            <td
              className="py-3 px-4 text-sm text-zinc-300 text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-8">
                <span>
                  Page {pagination} of {lastPage}
                </span>
                <div className="flex gap-1.5">
                  <IconButton
                    onClick={goToFirstPage}
                    disabled={pagination === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToPreviousPage}
                    disabled={pagination === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={pagination === lastPage}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={pagination === lastPage}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
