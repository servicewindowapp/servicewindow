const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, Header, Footer, PageNumber, PageBreak
} = require('/usr/local/lib/node_modules_global/lib/node_modules/docx');
const fs = require('fs');
const path = require('path');

const BASE = '/sessions/affectionate-pensive-mayer/mnt/Market Research';

// ─── COLORS & STYLES ──────────────────────────────────────────────────────────
const COLORS = {
  trucks:    { header: '1B4F72', accent: 'D6EAF8', row: 'EBF5FB' },
  venues:    { header: '145A32', accent: 'D5F5E3', row: 'EAFAF1' },
  requesters:{ header: '6E2F1A', accent: 'FDEBD0', row: 'FEF9E7' },
  providers: { header: '4A235A', accent: 'E8DAEF', row: 'F5EEF8' },
  events:    { header: '7D6608', accent: 'FDEBD0', row: 'FDFEFE' },
};

const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function spacer(pts = 80) {
  return new Paragraph({ children: [new TextRun('')], spacing: { before: pts, after: pts } });
}

function sectionTitle(text, color) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, color: 'FFFFFF', bold: true, font: 'Arial', size: 32 })],
    shading: { fill: color, type: ShadingType.CLEAR },
    spacing: { before: 240, after: 0 },
  });
}

function entryHeader(name, color) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text: name, bold: true, font: 'Arial', size: 26, color: color })],
    spacing: { before: 320, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: color } },
  });
}

function labelValue(label, value) {
  if (!value || value === 'Unknown') return null;
  return new TableRow({
    children: [
      new TableCell({
        borders,
        width: { size: 1800, type: WidthType.DXA },
        shading: { fill: 'F2F3F4', type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: label, bold: true, font: 'Arial', size: 18 })]
        })]
      }),
      new TableCell({
        borders,
        width: { size: 7560, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: value, font: 'Arial', size: 18 })]
        })]
      })
    ]
  });
}

function buildTable(rows) {
  const validRows = rows.filter(Boolean);
  if (validRows.length === 0) return null;
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [1800, 7560],
    rows: validRows,
  });
}

function divider(color) {
  return new Paragraph({
    children: [new TextRun('')],
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: color } },
    spacing: { before: 40, after: 80 },
  });
}

function makeStyles(headerColor) {
  return {
    default: {
      document: { run: { font: 'Arial', size: 20 } },
    },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: 'FFFFFF' },
        paragraph: { spacing: { before: 240, after: 0 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: 'Arial' },
        paragraph: { spacing: { before: 280, after: 60 }, outlineLevel: 1 },
      },
    ],
  };
}

function makeDoc(categoryTitle, color, entries) {
  const children = [];

  // Document title
  children.push(new Paragraph({
    children: [new TextRun({ text: categoryTitle.toUpperCase(), bold: true, size: 48, font: 'Arial', color: color.header })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: `ServiceWindow Market Research  |  SWFL  |  Compiled ${new Date().toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'})}`, size: 18, font: 'Arial', color: '7F8C8D' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 40 },
  }));
  children.push(new Paragraph({
    children: [new TextRun('')],
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: color.header } },
    spacing: { before: 40, after: 200 },
  }));
  children.push(new Paragraph({
    children: [new TextRun({ text: `${entries.length} entries`, size: 18, font: 'Arial', color: '7F8C8D', italics: true })],
    alignment: AlignmentType.RIGHT,
    spacing: { before: 0, after: 200 },
  }));

  for (const entry of entries) {
    children.push(entryHeader(entry.name, '#' + color.header));

    // Build contact table rows
    const rows = [
      labelValue('Owner / Operator', entry.owner),
      labelValue('Primary Contact', entry.contact),
      labelValue('Source', entry.source),
      labelValue('Phone', entry.phone),
      labelValue('Email', entry.email),
      labelValue('Website', entry.website),
      labelValue('Facebook', entry.facebook),
      labelValue('Instagram', entry.instagram),
      labelValue('Location', entry.location),
      labelValue('Cuisine / Type', entry.cuisine),
      labelValue('Hours', entry.hours),
      labelValue('Notes', entry.notes),
    ];

    const table = buildTable(rows);
    if (table) children.push(table);
    children.push(spacer(60));
  }

  return new Document({
    styles: makeStyles(color.header),
    sections: [{
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            children: [
              new TextRun({ text: `${categoryTitle}  |  ServiceWindow Market Research  |  Page `, size: 16, font: 'Arial', color: '7F8C8D' }),
              new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Arial', color: '7F8C8D' }),
            ],
            alignment: AlignmentType.CENTER,
          })]
        })
      },
      children,
    }],
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const foodTrucks = [
  { name: 'Freshly Prepped', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: '(239) 209-9111', email: 'freshlypreppedmeals@gmail.com', website: 'www.freshlypreppedmeals.com', facebook: 'FreshlyPreppedFoodTruck', instagram: '@freshlypreppedswfl', location: 'Charlotte County / Punta Gorda, FL', cuisine: 'Prepared meals', notes: 'Booking May–Dec 2026. Regular at Babcock Ranch (Wed) and Burnt Store Marina CC (Thu).' },
  { name: "Dave's Neapolitan Pizza", owner: 'Dave', contact: 'Dave', source: 'SWFL Food Truck Depot', phone: '239-258-1629', email: 'davesneapolitanpizza@gmail.com', website: null, facebook: "Dave's Neapolitan Pizza (verified page)", instagram: null, location: 'SWFL / Naples / Punta Gorda', cuisine: 'Neapolitan pizza', notes: 'Pizza class operator — 40 spots sell out immediately. Strong brand momentum. 3 posts in 24h window.' },
  { name: 'Dao Thai Cuisine', owner: 'Budsagon Meyer', contact: 'Budsagon Meyer', source: 'SWFL Food Truck Depot', phone: '812-319-8993', email: null, website: null, facebook: null, instagram: null, location: '14601 Palm Beach Blvd, Fort Myers, FL', cuisine: 'Thai food', hours: 'Fri–Sat–Sun 4–8pm', notes: 'Stationary location. Call ahead to order.' },
  { name: 'DaChefs Pancakes & Grill LLC', owner: 'ChefRoderick B Smith', contact: 'ChefRoderick B Smith', source: 'SWFL Food Truck Depot / SWFL Food Truck Owners Group', phone: '239-758-2143', email: 'Cakesandgrill@yahoo.com', website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Breakfast / Lunch / Dinner (pancakes & grill)', notes: 'April available dates: 10, 17, 23, 30. All-star contributor in operator group.' },
  { name: 'Little Italy in the USA', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: '239-785-5625', email: null, website: 'www.littleitalyinthe.com', facebook: null, instagram: null, location: 'SWFL', cuisine: 'Italian — pizza, pasta, lasagna, crepes, desserts', notes: 'Last-minute bookings welcome. Available for HOAs, breweries, private parties, corporate events.' },
  { name: 'La Bamba Mexican Grill', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: '239-425-5781', email: 'Realtacotruck@gmail.com', website: null, facebook: null, instagram: null, location: 'Fort Myers, FL', cuisine: 'Mexican / tacos', notes: 'Open for event bookings.' },
  { name: 'Ice Cream Emergency SWFL', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: '475-342-9107', email: 'ice11@icecreamemergency.com', website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Ice cream', notes: 'Targeting Hospital Appreciation Week May 10–16. Healthcare / hospital event focus.' },
  { name: "Mama's Meatballs", owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot / Collier & Lee County Food Trucks', phone: '(239) 470-71XX (partial)', email: null, website: null, facebook: "Mama's Meatballs", instagram: null, location: 'SWFL / Collier / Lee County', cuisine: 'Meatballs / Italian', notes: 'Highly active. Regular at Lee Memorial Hospital (Thu), Hop-Sized Brewing (Thu), Anarchy Ale Works (Fri), Coastal Dayz Brewery (Sat).' },
  { name: 'The Fat Cowboys Food Truck / Cheesesteak Tour Co.', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'The Fat Cowboys Food Truck', instagram: null, location: 'LaBelle / SWFL', cuisine: 'Cheesesteaks', notes: 'LaBelle Cheesesteak Tour rained out March 29. Rain date TBD. Active touring operator with strong social following.' },
  { name: "Horse Eyed Jake's American Sliders", owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: "Horse Eyed Jake's American Sliders", instagram: null, location: 'Punta Gorda / Burnt Store Marina CC', cuisine: 'Sliders and fries', notes: 'Regular at Burnt Store Marina Country Club events.' },
  { name: 'Big Chef American Cuisine', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Big Chef American Cuisine', instagram: null, location: 'Port Charlotte, FL', cuisine: 'American', notes: '2025 Best of Florida winner.' },
  { name: 'Lady Lola Food Truck', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Lady Lola Food Truck', instagram: null, location: 'SWFL', cuisine: 'Unknown', notes: 'Active Saturday March 28.' },
  { name: "Papa D's Cheesecake", owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: "Papa D's Cheesecake", instagram: null, location: 'SWFL / Babcock Ranch area', cuisine: 'Cheesecakes / desserts', notes: 'Regular at Babcock Ranch Saturdays.' },
  { name: 'Pure Squeeze Juice', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Northport / Wellen Park area', cuisine: 'Fresh juice', notes: 'Regular at Wellen Park Farmers Market every Sunday 9am–1pm.' },
  { name: 'Philly-Ice LLC', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Northport / Wellen Park area', cuisine: 'Philly / Italian ice', notes: 'Regular at Wellen Park Farmers Market every Sunday 9am–1pm.' },
  { name: 'Tzatziki Street', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Northport / Wellen Park area', cuisine: 'Greek', notes: 'Regular at Wellen Park Farmers Market every Sunday 9am–1pm.' },
  { name: 'Presto Pesto', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Northport / Wellen Park area', cuisine: 'Italian / pesto', notes: 'Regular at Wellen Park Farmers Market every Sunday 9am–1pm.' },
  { name: 'Cowabunga Doughnut Co.', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Northport / Wellen Park area', cuisine: 'Donuts', notes: 'Regular at Wellen Park Farmers Market every Sunday 9am–1pm.' },
  { name: 'SubTastic', owner: 'Unknown', contact: 'Unknown', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Submarines / sandwiches', notes: 'Was at Anarchy Ale Works March 21. Sold out. Posted with Anarchy Ale Works tag.' },
  { name: 'LaCafetera.239', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'LaCafetera.239', instagram: null, location: 'Collier County, FL', cuisine: 'Coffee / Cuban cafe', notes: 'Active at Collier Fair through March 30.' },
  { name: "Sergeant's Cuban Express", owner: 'Unknown', contact: 'Unknown', source: 'Food Trucks In & Around North Port FL', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'North Port, FL', cuisine: 'Cuban', notes: 'Active operator. Sold out Monday. Posts availability updates.' },
  { name: 'Beach-Bum Johnnie', owner: 'Unknown', contact: 'Unknown', source: 'Collier & Lee County Food Trucks / SWFL Food Truck Owners Group', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'North Fort Myers, FL (near Kismet & Del Prado)', cuisine: 'Unknown', notes: 'All-star contributor. Active in Collier/Lee area. Participates in community supply-sharing.' },
  { name: 'Sweeter Society', owner: 'Unknown', contact: 'Unknown', source: 'Collier & Lee County Food Trucks', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Desserts', notes: 'Was double-booked for Costco Car Show April 5. Sought a replacement dessert truck.' },
  { name: "Lil' Stack Shack", owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot / SWFL WHATS HAPPENING EVENTS & FESTIVALS', phone: null, email: null, website: null, facebook: "Lil' Stack Shack (Verified, All-star contributor)", instagram: null, location: 'SWFL / Alva area', cuisine: 'Desserts / donuts (pink truck)', notes: 'Confirmed at To Fly Equestrian April 4 event. Easter Weekend Special menu active. Active festival truck.' },
  { name: 'Casa De Uruguay', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot (responded to Nicole Evans post)', phone: '(315) 380-7609', email: null, website: null, facebook: null, instagram: null, location: 'Punta Gorda area', cuisine: 'Uruguayan', notes: 'Responded to Nicole Evans recurring Thursday biweekly booking near PG airport.' },
  { name: 'LaCoste Cajun Kitchen', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Cajun', notes: 'General availability post. Open for bookings.' },
  { name: 'Turn N Burn Fresh N Fast', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: 'turnnburnfreshnfast.com', facebook: null, instagram: null, location: 'SWFL', cuisine: 'Unknown', notes: 'Regular at Coastal Dayz Brewery.' },
  { name: 'Blades of Glory Culinary', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Fort Myers, FL', cuisine: 'Sliders / American', notes: 'Regular corporate placement at Sam Galloway Ford (11am–2pm). Rising contributor.' },
  { name: 'Lemonade Land', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Lemonade / Acai bowls', notes: 'Recently expanded menu to include fresh imported Brazilian acai bowls.' },
  { name: 'El Sauce Latin Grill', owner: 'Gilberto Marrero Alvarez', contact: 'Gilberto Marrero Alvarez', source: 'SWFL Food Truck Depot (reshared)', phone: null, email: null, website: null, facebook: 'el sauce latin grill (verified)', instagram: null, location: 'SWFL', cuisine: 'Latin grill', notes: null },
  { name: 'Countries Coffee LLC', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Countries Coffee LLC', instagram: null, location: 'Cape Coral / Marco Island / Naples area', cuisine: 'Coffee', notes: 'Active at multiple farmers markets: Marco Island FM, Cape Coral FM, Pine Ridge Rd FM.' },
  { name: 'Paradise Smoothie', owner: 'Long Pham', contact: 'Long Pham', source: 'SWFL Food Truck Owners Group', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Babcock Ranch area', cuisine: 'Smoothies / desserts', notes: 'Regular at Babcock Ranch Bluebird Park Saturdays 11am–3pm. Posted last-minute coverage request March 28.' },
  { name: 'Wrap Daddy Rolling Cafe', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Unknown', notes: 'Appeared at Volusia County fairgrounds event.' },
  { name: "Savino's Italian Kitchen LLC", owner: 'Unknown', contact: 'Unknown', source: 'Food Truck Connection of SWFL (new member)', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Italian', notes: 'New member of Food Truck Connection of SWFL group.' },
  { name: 'Krazy Pops Kitchen', owner: 'Unknown', contact: 'Unknown', source: 'Food Truck Connection of SWFL (new member)', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Unknown', notes: 'New member of Food Truck Connection of SWFL group.' },
  { name: 'Main Squeeze', owner: 'Unknown', contact: 'Unknown', source: 'Food Truck Connection of SWFL (new member)', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', cuisine: 'Juice / beverages', notes: 'New member of Food Truck Connection of SWFL group.' },
  { name: 'Hakeem Samara (Samara\'s Food Truck)', owner: 'Hakeem Samara', contact: 'Hakeem Samara', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Hakeem Samara', instagram: null, location: 'SWFL / Estero area', cuisine: 'Unknown', notes: 'Also acts as event booker for RAD Winery. Commented availability for First Christian Church Cape Coral April 19.' },
];

const venues = [
  { name: 'Millennial Brewing Co.', owner: 'Unknown', contact: 'Millennial Brewing Co. (text)', source: 'SWFL Food Truck Depot', phone: '239-292-8897 (TEXT ONLY)', email: null, website: null, facebook: null, instagram: null, location: '1811 Royal Palm Ave, Downtown Fort Myers, FL', notes: 'Regular live music events. Had last-minute truck cancellation March 28 (5pm–10pm). Recurring booking opportunity. HIGH VALUE.' },
  { name: 'The Pearl Founders Square', owner: 'Unknown', contact: 'Vida Management', source: 'Food Truck Connection of SWFL', phone: '239.529.3256', email: 'Thepearl@vida-management.com', website: null, facebook: null, instagram: null, location: '8820 Walter Way, Naples, FL', notes: 'Fridays 5–8pm. April availability: all Fridays except 4/24. May availability: all Fridays except 5/22.' },
  { name: 'Wellen Park Farmers Market', owner: 'Unknown', contact: 'Food trucks in & around North Port FL (Facebook page)', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Food trucks in & around North Port FL', instagram: null, location: '19745 Wellen Park Blvd, Northport, FL 34293', notes: 'Every Sunday 9am–1pm. Multiple food vendors weekly. High activity. Organizer page very active on social.' },
  { name: 'Burnt Store Marina Country Club (BSMCC)', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: '24315 Vincent Ave, Punta Gorda, FL', notes: 'Regular music events. Food trucks operate outside. Freshly Prepped (Thu) and Horse Eyed Jakes / Daves Pizza are regulars.' },
  { name: 'Babcock Ranch / Founders Square', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: '42850 Crescent Loop, Punta Gorda, FL', notes: 'Multiple events weekly. Freshly Prepped books Wednesdays. Papa D\'s Cheesecake Saturdays. Paradise Smoothie Saturdays (Bluebird Park). Established high-traffic location.' },
  { name: 'LLSN Farmers Market (Local Ladies Social Network)', owner: 'Christy Dunn', contact: 'Christy Dunn', source: 'SWFL Food Truck Depot', phone: null, email: 'LLSN@comcast.net', website: null, facebook: null, instagram: null, location: '2101 SW Pine Island Rd, Cape Coral, FL', notes: 'Every Thursday through April 30. Prefers breakfast trucks. Direct contact info publicly posted.' },
  { name: 'First Christian Church Cape Coral', owner: 'Unknown', contact: 'Maggie Bettis', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM Maggie Bettis', instagram: null, location: 'Cape Coral, FL', notes: 'Two events posted: April 4 (Easter — 10,000+ Easter eggs) and April 19. High engagement (27 comments). Likely recurring/high-frequency venue. HIGH VALUE.' },
  { name: 'Murano At Three Oaks', owner: 'Unknown', contact: 'Kevin Rueda (Property Manager)', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'DM Kevin Rueda', instagram: null, location: '17171 Three Oaks Pkwy, Fort Myers, FL 33967', notes: 'Seeking trucks April 9–30, Tuesday–Saturday, dinner and weekend shifts. 21 comments. Residential community. Potential for recurring monthly contract.' },
  { name: 'Slipaway Park', owner: 'Unknown', contact: 'Vanessa Franco (liaison)', source: 'SWFL Food Truck Owners Group', phone: null, email: null, website: null, facebook: 'DM Vanessa Franco in SWFL Food Truck Owners Group', instagram: null, location: 'SWFL (exact address unknown)', notes: 'Actively calling food truck operators to book slots. Vanessa Franco is the point of contact between Slipaway Park and operators. HIGH VALUE.' },
  { name: 'RAD Winery', owner: 'Unknown', contact: 'Hakeem Samara', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM Hakeem Samara', instagram: null, location: 'Estero, FL', notes: 'Posted same-day slot need (2–7pm). Two trucks already responded (AK Grill Gou, Red Roc Cravings). Likely recurring venue for food trucks.' },
  { name: 'Health Park (Lee Health)', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Owners Group', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Fort Myers, FL', notes: 'Regular food truck lunch rotation. Sweeter Society posted about a lunch slot here. Recurring venue.' },
  { name: 'Lee Memorial Hospital', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot (Mamas Meatballs schedule)', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Fort Myers, FL', notes: 'Regular lunch truck rotation. Mamas Meatballs books Thursdays 11am–3pm. High employee traffic.' },
  { name: 'Anarchy Ale Works', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', notes: 'Regular food truck host. SubTastic sold out here March 21. Mamas Meatballs books Fridays until sell out.' },
  { name: 'Coastal Dayz Brewery', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', notes: 'Regular food truck host. Mamas Meatballs (Sat 1–7pm) and Turn N Burn Fresh N Fast both co-located here.' },
  { name: 'Hop-Sized Brewing', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot (Mamas Meatballs schedule)', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL', notes: 'Regular food truck host. Mamas Meatballs books Thursdays 4–8pm.' },
  { name: 'Point Ybel Brewing Company', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot (Collier & Lee County Food Trucks)', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'San Carlos Park / Fort Myers area', notes: "Mamas Meatballs posted from here. Regular truck host." },
  { name: 'Sam Galloway Ford', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Fort Myers, FL', notes: 'Regular corporate food truck placement. Blades of Glory Culinary books 11am–2pm.' },
  { name: 'To Fly Equestrian', owner: 'Unknown', contact: 'Deborah Lynn Hahn (event promoter)', source: 'SWFL WHATS HAPPENING EVENTS & FESTIVALS', phone: null, email: null, website: null, facebook: 'DM Deborah Lynn Hahn', instagram: null, location: '21571 N River Rd, Alva, FL 33920', notes: '"Spring at the Barn" event April 4, 11am–2pm. Easter Egg Hunt, Pony Rides, Food Trucks. Lil Stack Shack confirmed. Recurring equestrian venue.' },
  { name: 'The Southerly at Heron Creek', owner: 'Unknown', contact: 'Lindsey Petit', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'North Port, FL', notes: 'Apartment community (70% occupied). Posts last-minute food truck requests for resident events (4pm–7pm). Recurring venue type.' },
  { name: 'Bayside Estates', owner: 'Unknown', contact: 'Lori Lea', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: null, instagram: null, location: '11201 Bayside Lane, Fort Myers Beach, FL', notes: 'Event April 25, 1–4pm, approx 75 guests.' },
];

const truckRequesters = [
  { name: 'Nicole Evans (Employee Lunch Program)', owner: null, contact: 'Nicole Evans', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Reply to Nicole Evans post in SWFL Food Truck Depot', instagram: null, location: 'Near Punta Gorda Airport, Piper Rd', notes: 'CRITICAL LEAD. Biweekly recurring Thursday 10am–2pm starting April 9. 50–75 employees, employees pay own meals. Lunch food only (no drink trucks). 86 reactions, 91 comments — highest engagement booking post across all 3 days of research.' },
  { name: 'Amanda McGarry Clyatt — Sallie Jones Elementary', owner: null, contact: 'Amanda McGarry Clyatt', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM Amanda McGarry Clyatt', instagram: null, location: 'Punta Gorda, FL', notes: 'School event April 24, 10:30am–1:30pm. 23 comments — second highest engagement booking post. Multiple trucks already responded.' },
  { name: 'Maggie Bettis — First Christian Church Cape Coral', owner: null, contact: 'Maggie Bettis', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM Maggie Bettis', instagram: null, location: 'Cape Coral, FL', notes: 'Two separate events: April 4 (Easter, 10,000+ Easter eggs) and April 19 (general church event). 10 reactions, 27 comments on April 19 post. High-value repeat venue contact.' },
  { name: 'Kevin Rueda — Murano At Three Oaks', owner: null, contact: 'Kevin Rueda (Property Manager)', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'Comment or tag in Facebook post', instagram: null, location: '17171 Three Oaks Pkwy, Fort Myers, FL 33967', notes: 'Seeking food trucks for April 9–30, Tuesday–Saturday, dinner and weekend shifts. Residential community. 21 comments. Potential for recurring relationship.' },
  { name: 'Christy Dunn — LLSN Farmers Market', owner: null, contact: 'Christy Dunn', source: 'SWFL Food Truck Depot', phone: null, email: 'LLSN@comcast.net', website: null, facebook: null, instagram: null, location: '2101 SW Pine Island Rd, Cape Coral, FL', notes: 'Every Thursday through April 30. Prefers breakfast food trucks. Direct email publicly posted.' },
  { name: 'Hakeem Samara — RAD Winery Booking', owner: null, contact: 'Hakeem Samara', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM Hakeem Samara', instagram: null, location: 'RAD Winery, Estero, FL', notes: 'Posted same-day truck request: 2–7pm slot. 25 reactions. AK Grill Gou and Red Roc Cravings responded. Slot may still be open.' },
  { name: 'LLSN Events (Local Ladies Social Network)', owner: null, contact: 'LLSN Events (Facebook page)', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM LLSN Events page', instagram: null, location: 'Unknown — needs DM for details', notes: 'Seeking breakfast food truck. Date/location not specified in post. 7 reactions, 2 responses.' },
  { name: 'Millennial Brewing Co. (Emergency Booking)', owner: null, contact: 'Millennial Brewing Co.', source: 'SWFL Food Truck Depot', phone: '239-292-8897 (TEXT)', email: null, website: null, facebook: null, instagram: null, location: '1811 Royal Palm Ave, Downtown Fort Myers, FL', notes: 'Last-minute emergency booking March 28, 5pm–10pm. Truck had canceled day-of with live music event ongoing. Recurring venue — worth establishing a standing relationship.' },
  { name: 'Long Pham — Babcock Ranch Coverage Need', owner: null, contact: 'Long Pham', source: 'SWFL Food Truck Owners Group', phone: null, email: null, website: null, facebook: 'DM Long Pham', instagram: null, location: 'Babcock Ranch Bluebird Park, Punta Gorda, FL', notes: 'Sought a dessert truck to cover March 28, 11am–3pm slot. Truck was his own (Paradise Smoothie). Recurring Saturday location — potential for ongoing relationship.' },
  { name: 'Sweeter Society — Costco Car Show Coverage', owner: null, contact: 'Sweeter Society', source: 'Collier & Lee County Food Trucks', phone: null, email: null, website: null, facebook: 'Contact via Facebook', instagram: null, location: 'Costco (SWFL)', notes: 'Double-booked for April 5 Costco Car Show (9am–2pm). Sought replacement dessert truck. High-profile corporate event.' },
  { name: 'Lori Lea — Bayside Estates Event', owner: null, contact: 'Lori Lea', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'DM Lori Lea', instagram: null, location: '11201 Bayside Lane, Fort Myers Beach, FL', notes: 'April 25, 1–4pm, approximately 75 guests.' },
  { name: 'Genesys Nichols — The Millennium Fort Myers', owner: null, contact: 'Genesys Nichols', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'DM Genesys Nichols', instagram: null, location: 'The Millennium, Fort Myers, FL', notes: '3rd Thursday monthly recurring slot. Venue name suggests event/banquet space. Recurring monthly — high value.' },
  { name: 'Cypress Schnicke — Farmers Market Truck Needed', owner: null, contact: 'Cypress Schnicke', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'DM Cypress Schnicke', instagram: null, location: 'Fort Myers, FL (near I-75 / Hwy 80)', notes: 'Seeking truck for a farmers market. Location near I-75/Hwy 80, Fort Myers.' },
  { name: 'Jennifer Rena Bennett — Crepe Truck Wanted', owner: null, contact: 'Jennifer Rena Bennett', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'DM Jennifer Rena Bennett', instagram: null, location: 'SWFL', notes: 'Looking specifically for a crepe food truck. Requested DM with contact info.' },
  { name: 'Lindsey Petit — The Southerly at Heron Creek', owner: null, contact: 'Lindsey Petit', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'The Southerly at Heron Creek, North Port, FL', notes: 'Last-minute request for truck to serve apartment community event, 4pm–7pm. Nearly 70% occupied community. Recurring venue type.' },
  { name: 'Mark Kaspers — Permanent Truck Space Wanted', owner: null, contact: 'Mark Kaspers', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'DM Mark Kaspers', instagram: null, location: 'Naples, FL', notes: 'Operator (not client) seeking permanent rental space for his truck in Naples. Market signal for location scarcity in Naples.' },
];

const serviceProviders = [
  { name: 'Chef Robert / Robert Cardoos — Food Truck Licensing', owner: 'Robert Cardoos', contact: 'Robert Cardoos (Chef Robert)', source: 'SWFL Food Truck Owners Group', phone: '239.834.7170', email: null, website: null, facebook: null, instagram: null, location: 'SWFL', notes: 'Certified DBPR and Dept of Agriculture food truck licensing consultant. Handles Commercial Kitchen compliance. Weekday, evening, and weekend meetings available. Targets new food truck owners and farmers market vendors.' },
  { name: 'Homestead.Market — Commissary Kitchen', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Homestead.Market', instagram: null, location: '3057 S Tamiami Trail, Port Charlotte, FL', notes: 'Active commissary kitchen. Recently added commercial Smokaroma pressure smoker (45 lbs per cycle, 90 min). Seeking commissary members — reply "WAITLIST" to their Facebook post. Relevant for operators needing licensed kitchen access.' },
  { name: 'Events In SW Florida (Facebook Page)', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot / Group 7', phone: null, email: 'eventsinswflorida@gmail.com', website: null, facebook: 'Events In SW Florida', instagram: null, location: 'Naples, FL (based)', notes: '49,000 followers. General SWFL events promoter page. Posts sporadically. Email available for contact.' },
  { name: 'Access Art FL / Oddities & Art Markets', owner: 'Ashley Mack', contact: 'Ashley Mack', source: 'SWFL Food Truck Depot', phone: null, email: null, website: 'www.accessartfl.org', facebook: null, instagram: null, location: 'Fort Myers, FL', notes: '2nd annual Oddities & Art Markets. Food truck registration through accessartfl.org. 3,000+ attendees per weekend. High-volume event with food truck vendor registration open.' },
  { name: 'Food Trucks In & Around North Port FL (Facebook Page)', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Food trucks in & around North Port FL', instagram: null, location: 'North Port / Wellen Park area', notes: '7,600 members. Top contributor — posts weekly event aggregates and live video from events. De facto North Port food truck promoter. Very active. Key community node.' },
  { name: 'Deborah Lynn Hahn — SWFL Event Promoter', owner: 'Deborah Lynn Hahn', contact: 'Deborah Lynn Hahn', source: 'SWFL WHATS HAPPENING EVENTS & FESTIVALS / Collier & Lee County Food Trucks', phone: null, email: null, website: null, facebook: 'Deborah Lynn Hahn', instagram: null, location: 'SWFL', notes: 'Active event promoter in SWFL WHATS HAPPENING EVENTS & FESTIVALS group (29,300 members). Posts multi-image event announcements. Shared To Fly Equestrian event. Ongoing spring event registration posts.' },
  { name: 'Rob Campbell — Onlyfoodtrucks.com', owner: 'Rob Campbell', contact: 'Rob Campbell', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: 'www.onlyfoodtrucks.com', facebook: null, instagram: null, location: 'SWFL', notes: 'Commented on Kevin Rueda (Murano At Three Oaks) post to mention Onlyfoodtrucks.com. Possible competing platform or directory service.' },
  { name: 'Karen McCaul Kuzer — Group Admin', owner: 'Karen McCaul Kuzer', contact: 'Karen McCaul Kuzer', source: 'Food Truck Connection of SWFL (Admin)', phone: null, email: null, website: null, facebook: 'Food Truck Connection of SWFL (Admin)', instagram: null, location: 'SWFL', notes: 'Admin of Food Truck Connection of SWFL (3,400 members). Rising contributor. Controls post moderation — only food truck booking posts permitted. Key gatekeeper in this group.' },
];

const eventsAndFestivals = [
  { name: 'Best of the Best — Punta Gorda (Weekly)', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Owners Group (sidebar flyer)', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Punta Gorda, FL', notes: 'New weekly recurring event. April 18 confirmed first date. Racing, fireworks, live music, beer garden. Actively recruiting food trucks. High-visibility event format.' },
  { name: 'Wellen Park Farmers Market (Weekly — Sundays)', owner: 'Unknown', contact: 'Food trucks in & around North Port FL (Facebook page)', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Food trucks in & around North Port FL', instagram: null, location: '19745 Wellen Park Blvd, Northport, FL 34293', notes: 'Every Sunday 9am–1pm. Multiple food trucks weekly. Organizer page posts live video from events. Very high activity and community engagement.' },
  { name: 'LLSN Farmers Market (Weekly — Thursdays)', owner: 'Christy Dunn', contact: 'Christy Dunn', source: 'SWFL Food Truck Depot', phone: null, email: 'LLSN@comcast.net', website: null, facebook: null, instagram: null, location: '2101 SW Pine Island Rd, Cape Coral, FL', notes: 'Every Thursday through April 30. Prefers breakfast trucks. Run by the Local Ladies Social Network (LLSN).' },
  { name: 'Babcock Ranch / Founders Square Events (Weekly)', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: '42850 Crescent Loop, Punta Gorda, FL', notes: 'Multiple events per week. Established SWFL food truck destination. Freshly Prepped (Wed lunch), Papa D\'s Cheesecake (Sat), Paradise Smoothie (Sat) all confirmed regulars.' },
  { name: 'Oddities & Art Markets Fort Myers (Annual / Multi-weekend)', owner: 'Ashley Mack', contact: 'Ashley Mack', source: 'SWFL Food Truck Depot', phone: null, email: null, website: 'www.accessartfl.org', facebook: null, instagram: null, location: 'Fort Myers, FL', notes: '2nd annual. Food truck registration open at accessartfl.org. 3,000+ attendees per weekend. Multi-weekend event series.' },
  { name: 'Hospital Appreciation Week (Annual — May 10–16)', owner: null, contact: 'See Ice Cream Emergency SWFL', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'SWFL (multiple hospital locations)', notes: 'Annual week-long event targeting healthcare workers. Ice Cream Emergency SWFL actively marketing for this window. Contact: ice11@icecreamemergency.com / 475-342-9107.' },
  { name: 'First Christian Church Cape Coral Events (Recurring)', owner: 'Unknown', contact: 'Maggie Bettis', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM Maggie Bettis', instagram: null, location: 'Cape Coral, FL', notes: 'April 4 (Easter — 10,000+ eggs) and April 19 confirmed. 27 comments on April 19 post. Likely books trucks for multiple community events throughout the year.' },
  { name: 'Easter Festival at Equestrian Acres (Annual)', owner: 'Unknown', contact: 'Unknown — DM organizer in Collier & Lee County Food Trucks group', source: 'Collier & Lee County Food Trucks', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Alva, FL', notes: 'April 4, 11am–2pm. "Supplies running short" — vendor spots filling fast. Alva FL area. Same date zone as To Fly Equestrian event.' },
  { name: 'Spring at the Barn — To Fly Equestrian (Seasonal)', owner: 'Unknown', contact: 'Deborah Lynn Hahn (promoter)', source: 'SWFL WHATS HAPPENING EVENTS & FESTIVALS', phone: null, email: null, website: null, facebook: 'DM Deborah Lynn Hahn', instagram: null, location: '21571 N River Rd, Alva, FL 33920', notes: 'April 4, 11am–2pm. Easter Egg Hunt, Pony Rides, Food Trucks. Lil Stack Shack confirmed. Equestrian venue — recurring event potential.' },
  { name: 'Collier County Fair (Annual)', owner: 'Unknown', contact: 'Unknown', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Collier County, FL', notes: 'LaCafetera.239 operating through March 30. Multi-day event. Recurring annual fair.' },
  { name: "Sallie Jones Elementary School Event", owner: null, contact: 'Amanda McGarry Clyatt', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'DM Amanda McGarry Clyatt', instagram: null, location: 'Punta Gorda, FL', notes: 'April 24, 10:30am–1:30pm. 23 comments — extremely high truck interest. School events are a recurring vertical worth pursuing.' },
  { name: "Nicole Evans Biweekly Lunch Program", owner: null, contact: 'Nicole Evans', source: 'SWFL Food Truck Depot', phone: null, email: null, website: null, facebook: 'Reply to Nicole Evans post', instagram: null, location: 'Near PG Airport, Piper Rd, Punta Gorda, FL', notes: 'Every other Thursday starting April 9, 10am–2pm. 50–75 employees. Lunch food only. 91 comments. Highest engagement signal in all 3 days of research. CRITICAL opportunity.' },
  { name: 'The Millennium Fort Myers (Monthly — 3rd Thursday)', owner: 'Unknown', contact: 'Genesys Nichols', source: 'Food Truck Connection of SWFL', phone: null, email: null, website: null, facebook: 'DM Genesys Nichols', instagram: null, location: 'Fort Myers, FL', notes: '3rd Thursday monthly recurring food truck slot. Reliable calendar anchor.' },
  { name: 'Costco Car Show', owner: null, contact: 'See Sweeter Society (truck that posted)', source: 'Collier & Lee County Food Trucks', phone: null, email: null, website: null, facebook: null, instagram: null, location: 'Collier / Lee County Costco, FL', notes: 'April 5, 9am–2pm. Corporate-affiliated event with high foot traffic. Sweeter Society was double-booked and sought a replacement dessert truck.' },
];

// ─── GENERATE DOCS ────────────────────────────────────────────────────────────
async function main() {
  const jobs = [
    { file: `${BASE}/1 - Food Trucks/Food Trucks - Contact Database.docx`, title: 'Food Trucks', color: COLORS.trucks, data: foodTrucks },
    { file: `${BASE}/2 - Venues/Venues - Contact Database.docx`, title: 'Venues', color: COLORS.venues, data: venues },
    { file: `${BASE}/3 - Truck Requesters/Truck Requesters - Contact Database.docx`, title: 'Truck Requesters', color: COLORS.requesters, data: truckRequesters },
    { file: `${BASE}/4 - Service Providers/Service Providers - Contact Database.docx`, title: 'Service Providers', color: COLORS.providers, data: serviceProviders },
    { file: `${BASE}/5 - Recurring Festivals and Events/Recurring Festivals and Events - Contact Database.docx`, title: 'Recurring Festivals and Events', color: COLORS.events, data: eventsAndFestivals },
  ];

  for (const job of jobs) {
    const doc = makeDoc(job.title, job.color, job.data);
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(job.file, buffer);
    console.log(`✓ ${job.title} — ${job.data.length} entries → ${job.file}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
