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
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "250 ",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "150 ",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "350 ",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "450 ",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "550 ",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "300 ",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "300 ",
      paymentMethod: "Credit Card",
    },
   
  ]
  
  export function HistoryEat() {
    const [searchTerm, setSearchTerm] = useState("")
  
    const filteredInvoices = invoices.filter((invoice) =>
      Object.values(invoice).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  
    return (
      <div className="space-y-4">
        <div className="text-xl font-bold">ประวัติการกิน วันนี้</div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="search">ค้นหา </Label>
          <Input
            id="search"
            type="text"
            placeholder="ค้นหาประวัติการกิน..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5 font-bold text-primary">เวลา</TableHead>
              <TableHead className="font-bold text-primary">ประเภท</TableHead>
              <TableHead className="font-bold text-primary">ชื่อเมนู</TableHead>
              <TableHead className="text-right font-bold text-primary">จำนวนเเคลอรี่</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount} Kcal</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                ${filteredInvoices.reduce((total, invoice) => total + parseFloat(invoice.totalAmount.slice(1)), 0).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
  
  