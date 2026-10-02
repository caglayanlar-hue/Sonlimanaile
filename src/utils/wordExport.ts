import { FamilyMeetingRecord, FamilyMember } from '../types';

export function exportMeetingToWordDoc(record: FamilyMeetingRecord, members: FamilyMember[]) {
  const memberMap = new Map(members.map(m => [m.id, m]));
  
  const attendeeNames = record.attendees
    .map(id => {
      const m = memberMap.get(id);
      return m ? `${m.name} (${m.roleLabel})` : id;
    })
    .join(', ');

  const decisionsRows = record.decisions.length > 0
    ? record.decisions.map((d, index) => `
      <tr style="background-color: ${index % 2 === 0 ? '#fafaf9' : '#ffffff'};">
        <td style="border: 1px solid #d6d3d1; padding: 10px; font-weight: bold; text-align: center; width: 40px;">${index + 1}</td>
        <td style="border: 1px solid #d6d3d1; padding: 10px; font-weight: 600; color: #78350f; width: 140px;">${escapeHtml(d.topic)}</td>
        <td style="border: 1px solid #d6d3d1; padding: 10px; color: #1c1917;">${escapeHtml(d.decisionText)}</td>
        <td style="border: 1px solid #d6d3d1; padding: 10px; text-align: center; color: #44403c; width: 120px;">${escapeHtml(d.responsible)}</td>
        <td style="border: 1px solid #d6d3d1; padding: 10px; text-align: center; color: #44403c; width: 90px;">${escapeHtml(d.targetDate || 'Sürekli')}</td>
      </tr>
    `).join('')
    : `
      <tr>
        <td colspan="5" style="border: 1px solid #d6d3d1; padding: 14px; text-align: center; color: #78716c; font-style: italic;">
          Bu toplantıda kayıt altına alınmış karar bulunmamaktadır.
        </td>
      </tr>
    `;

  const signaturesHtml = members
    .filter(m => record.attendees.includes(m.id) || record.attendees.length === 0)
    .map(m => `
      <div style="display: inline-block; width: 28%; min-width: 150px; margin: 15px 2%; text-align: center; vertical-align: top;">
        <div style="font-weight: bold; color: #1c1917; font-size: 13pt;">${escapeHtml(m.name)}</div>
        <div style="color: #78350f; font-size: 11pt; margin-bottom: 30px;">${escapeHtml(m.roleLabel)}</div>
        <div style="border-top: 1px dashed #78716c; width: 80%; margin: 0 auto; padding-top: 5px; font-size: 9pt; color: #a8a29e;">(İmza)</div>
      </div>
    `)
    .join('');

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Aile Meclisi Karar Tutanağı</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          body {
            font-family: 'Times New Roman', 'Georgia', serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #1c1917;
            margin: 40px;
          }
          h1 {
            font-family: 'Georgia', serif;
            color: #78350f;
            text-align: center;
            font-size: 20pt;
            margin-bottom: 4px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .subtitle {
            text-align: center;
            font-style: italic;
            color: #854d0e;
            font-size: 11pt;
            margin-bottom: 24px;
            padding-bottom: 12px;
            border-bottom: 2px solid #b45309;
          }
          .quote-box {
            background-color: #fef3c7;
            border-left: 4px solid #d97706;
            padding: 12px 18px;
            margin: 16px 0 24px 0;
            font-style: italic;
            color: #78350f;
            border-radius: 4px;
          }
          .meta-table {
            width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
          }
          .meta-table td {
            padding: 6px 10px;
            vertical-align: top;
          }
          .meta-label {
            font-weight: bold;
            color: #78350f;
            width: 160px;
          }
          .section-title {
            font-size: 14pt;
            font-weight: bold;
            color: #92400e;
            margin-top: 24px;
            margin-bottom: 8px;
            padding-bottom: 4px;
            border-bottom: 1px solid #fde68a;
          }
          .content-box {
            background-color: #fafaf9;
            border: 1px solid #e7e5e4;
            padding: 12px 16px;
            margin-bottom: 16px;
            border-radius: 4px;
            white-space: pre-line;
          }
          .decisions-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            margin-bottom: 24px;
          }
          .decisions-table th {
            background-color: #78350f;
            color: #ffffff;
            font-weight: bold;
            padding: 10px;
            border: 1px solid #78350f;
            text-align: left;
            font-size: 11pt;
          }
          .footer-note {
            margin-top: 40px;
            font-size: 9pt;
            text-align: center;
            color: #78716c;
            border-top: 1px solid #e7e5e4;
            padding-top: 12px;
          }
        </style>
      </head>
      <body>
        <h1>AİLE MECLİSİ TOPLANTI KARAR TUTANAĞI</h1>
        <div class="subtitle">"Bilsem Öğrencilerinin Kaleminden Aile Dediğin" — Sevgi, İstişare ve Ortak Akıl Belgesi</div>

        <div class="quote-box">
          &ldquo;Aile, insanın ruhunu ısıtan en eski ocaktır. Bir sorunun varsa onu saklamak yarayı derinleştirir, aileyle paylaşmak ise şifa getirir.&rdquo;
          <br>
          <span style="font-size: 9pt; font-weight: bold; float: right; margin-top: 4px;">— "Bilsem Öğrencilerinin Kaleminden Aile Dediğin"</span>
          <div style="clear: both;"></div>
        </div>

        <table class="meta-table">
          <tr>
            <td class="meta-label">📅 Toplantı Tarihi:</td>
            <td><strong>${escapeHtml(record.meetingDate)}</strong> — Saat: <strong>${escapeHtml(record.meetingTime || 'Akşam Çay Saati')}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">👥 Katılımcılar:</td>
            <td>${attendeeNames || 'Tüm Aile Üyeleri'}</td>
          </tr>
          <tr>
            <td class="meta-label">☕ Toplantı İkramı:</td>
            <td>${escapeHtml(record.treats.join(', ') || 'Demli Çay, Sıcak Ihlamur ve Anne Kurabiyesi')}</td>
          </tr>
          <tr>
            <td class="meta-label">📝 Toplantı Yazmanı:</td>
            <td>${escapeHtml(record.scribe || 'Birlikte Tutuldu')}</td>
          </tr>
        </table>

        ${record.gratitudeSection ? `
          <div class="section-title">🌸 1. Bu Haftaki Güzellikler & Şükranlarımız</div>
          <div class="content-box">${escapeHtml(record.gratitudeSection)}</div>
        ` : ''}

        ${record.problemsAndNeeds ? `
          <div class="section-title">💬 2. Konuşulan Sorunlar & Samimi İhtiyaçlar</div>
          <div class="content-box">${escapeHtml(record.problemsAndNeeds)}</div>
        ` : ''}

        <div class="section-title">📜 3. Aile Meclisinde Alınan Kararlar</div>
        <table class="decisions-table">
          <thead>
            <tr>
              <th style="text-align: center; width: 40px;">No</th>
              <th style="width: 140px;">Konu</th>
              <th>Alınan Karar / Kural</th>
              <th style="text-align: center; width: 120px;">Sorumlu</th>
              <th style="text-align: center; width: 90px;">Uygulama</th>
            </tr>
          </thead>
          <tbody>
            ${decisionsRows}
          </tbody>
        </table>

        ${record.nextMeetingDate ? `
          <p style="margin-top: 14px; font-weight: bold; color: #78350f;">
            📌 Bir Sonraki Aile Toplantısı: <span style="color: #1c1917;">${escapeHtml(record.nextMeetingDate)}</span>
          </p>
        ` : ''}

        <div class="section-title" style="margin-top: 30px;">✍️ Aile Fertlerinin Onayı & İmzaları</div>
        <p style="font-size: 10pt; color: #57534e; margin-bottom: 20px;">
          Yukarıda alınan kararlar tüm aile fertlerinin ortak rızası ve sevgisiyle kabul edilmiş olup, hep birlikte uygulanacaktır.
        </p>

        <div style="text-align: center; margin-top: 25px;">
          ${signaturesHtml}
        </div>

        <div class="footer-note">
          Bu karar tutanağı, <strong>Aile Dediğin</strong> aile içi iletişim portalı aracılığıyla hazırlanmış ve arşivlenmiştir.<br>
          <em>"Biz bir arada olduğumuz sürece her zorluğu aşarız."</em>
        </div>
      </body>
    </html>
  `;

  // Create downloadable Blob for Word (.doc)
  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  const sanitizedDate = (record.meetingDate || 'Toplanti').replace(/[^a-zA-Z0-9_-]/g, '_');
  downloadLink.download = `Aile-Meclisi-Kararlari-${sanitizedDate}.doc`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
