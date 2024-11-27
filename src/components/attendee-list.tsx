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

const server = "http://localhost:3333";
interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const hasPaginationBeenRendered = useRef(false);
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }
    return 1;
  });
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const offset = 10;
  const totalPages = Math.ceil(total / offset);

  useEffect(() => {
    if (hasPaginationBeenRendered.current) {
      const eventId = "9e9bd979-9d10-4915-b339-3786b1634f70";
      const path = `/events/${eventId}/attendees`;

      const url = new URL(server.concat(path));
      url.searchParams.set("pageIndex", String(page - 1));
      if (search.length > 0) url.searchParams.set("query", search);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setAttendees(data.attendees);
          setTotal(data.total);
        });
    }
    hasPaginationBeenRendered.current = true;
  }, [page, search]);

  // Search
  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    const typingTimeout = setTimeout(() => {
      setSearch(event.target.value);
    }, 1500);
    return () => clearTimeout(typingTimeout);
  }

  // Pagination
  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url);
    setPage(page);
  }

  function goToFirstPage() {
    if (page > 1) {
      setCurrentPage(1);
    }
  }

  function goToPreviousPage() {
    if (page > 1) {
      setCurrentPage(page - 1);
    }
  }

  function goToNextPage() {
    if (page < totalPages) {
      setCurrentPage(page + 1);
    }
  }

  function goToLastPage() {
    if (page < totalPages) {
      setCurrentPage(totalPages);
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
            className="flex-1 bg-transparent border-0 p-0 text-sm outline-none border-transparent focus:border-transparent focus:ring-0"
            placeholder="Search attendee"
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10 bg-zinc-900">
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
          {attendees.map((attendee) => (
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
              <TableCell>{attendee.id}</TableCell>
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
                {attendee.checkedInAt ? (
                  formatDistance(attendee.checkedInAt, new Date(), {
                    locale: enUS,
                    addSuffix: true,
                  })
                ) : (
                  <span className="color: text-zinc-500">Did not check in</span>
                )}
              </TableCell>
              <TableCell>
                <IconButton transparent>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot className="bg-zinc-900">
          <tr>
            <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
              Showing {attendees.length} of {total} items
            </TableCell>
            <td
              className="py-3 px-4 text-sm text-zinc-300 text-right"
              colSpan={3}
            >
              <div className="inline-flex items-center gap-8">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
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
