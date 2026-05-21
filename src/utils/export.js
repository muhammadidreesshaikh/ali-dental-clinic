export function downloadCsv(rows, filename) {
  if (!rows?.length) {
    return;
  }

  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => JSON.stringify(row[header] ?? '')).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function printTableAsPdf(title, rows) {
  const popup = window.open('', '_blank', 'width=1200,height=900');
  if (!popup) {
    return;
  }

  const tableRows = rows
    .map((row) => `<tr>${Object.values(row)
      .map((value) => `<td style="padding:10px;border-bottom:1px solid #e5e7eb;">${String(value)}</td>`)
      .join('')}</tr>`)
    .join('');

  popup.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body{font-family:Segoe UI,Arial,sans-serif;padding:28px;color:#102033}
          h1{margin:0 0 16px}
          table{width:100%;border-collapse:collapse}
          th{padding:12px;text-align:left;background:#eaf8f3;border-bottom:1px solid #d9e9e1}
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table>
          <thead><tr>${Object.keys(rows[0] || {})
            .map((key) => `<th>${key}</th>`)
            .join('')}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `);
  popup.document.close();
  popup.focus();
  popup.print();
}