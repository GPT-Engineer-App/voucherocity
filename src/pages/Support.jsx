import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Support = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Support</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter the subject of your inquiry" />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Describe your issue or question" rows={5} />
        </div>
        <Button type="submit">Submit Ticket</Button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">FAQs</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>How do I convert a voucher?</li>
          <li>What currencies are supported?</li>
          <li>How long does the conversion process take?</li>
          <li>Is there a limit on the number of vouchers I can convert?</li>
        </ul>
      </div>
    </div>
  );
};

export default Support;
