import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const invoices = [
  {
    time: "12:00",
    type: "ของคาว",
    calories: "250",
    manuName: "ผัดกระเพา",
  },
  {
    time: "11:00",
    type: "ของคาว",
    calories: "150",
    manuName: "ขาไก่",
  },
  {
    time: "06:00",
    type: "ของกินเล่น",
    calories: "350",
    manuName: "หมูปิ้ง",
  },
  {
    time: "00:00",
    type: "ของหวาน",
    calories: "450",
    manuName: "เค้ก",
  },
  {
    time: "12:00",
    type: "ของคาว",
    calories: "550",
    manuName: "ผัดกระเพา",
  },
]

export function HistoryEat() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "ของคาว" | "ของหวาน" | "ของกินเล่น">("all")
  
  const filteredInvoices = invoices.filter((manuName) =>
    (filterType === "all" || manuName.type === filterType) &&
    (manuName.manuName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     manuName.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
     manuName.calories.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold">ประวัติการกิน วันนี้</div>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Label htmlFor="search">ค้นหา</Label>
          <Input
            id="search"
            type="text"
            placeholder="ค้นหาประวัติการกิน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-[180px]">
          <Label htmlFor="filter-type">ประเภทอาหาร</Label>
          <Select
            value={filterType}
            onValueChange={(value: "all" | "ของคาว" | "ของหวาน" | "ของกินเล่น") => setFilterType(value)}
          >
            <SelectTrigger id="filter-type">
              <SelectValue placeholder="เลือกประเภท" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="ของคาว">ของคาว</SelectItem>
              <SelectItem value="ของหวาน">ของหวาน</SelectItem>
              <SelectItem value="ของกินเล่น">ของกินเล่น</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableCaption>ประวัติการกินอาหารของคุณ</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5 font-bold text-primary">เวลา</TableHead>
            <TableHead className="font-bold text-primary">ชื่อเมนู</TableHead>
            <TableHead className="font-bold text-primary">ประเภท</TableHead>
            <TableHead className="text-right font-bold text-primary">จำนวนเเคลอรี่</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice, index) => (
            <TableRow key={`${invoice.time}-${index}`}>
              <TableCell className="">{invoice.time}</TableCell>
              <TableCell>{invoice.manuName}</TableCell>
              <TableCell>{invoice.type}</TableCell>
              <TableCell className="text-right">{invoice.calories} Kcal</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {filteredInvoices.reduce((total, invoice) => total + parseFloat(invoice.calories), 0).toFixed(2)} kcal
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

