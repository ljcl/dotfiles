require 'dimensions'
require 'cgi'
require 'time'

Maid.rules do

  rule 'Remove duplicate files' do
    verbose_dupes_in('~/Downloads/*').each do |p|
      trash(p)
    end
  end

  rule 'Sort OCR Receipts in Drive into appropriate folders' do
    receipts_uploads = "~/Documents/Drive/Sort/Receipts"
    files(File.join(receipts_uploads, "*")).each do |path|
      commentdate = `mdls -name kMDItemFinderComment -raw "#{path}"`
      if commentdate == "(null)"
        date_title = modified_at(path).strftime("%Y-%m-%d %H.%M.%S")
        filename = date_title + ' ' + File.basename(path)
        year_folder  = modified_at(path).year.to_s
        month_folder = modified_at(path).strftime("%m-%b")
      else
        date_str = commentdate
        begin
          date_title = Date.parse date_str
          year_folder  = date_title.strftime("%Y")
          month_folder = date_title.strftime("%m-%b")
          date_title = date_title.strftime("%Y-%m-%d")
          filename = date_title + ' ' + File.basename(path)
        rescue ArgumentError
           year_folder  = modified_at(path).strftime("%Y")
           month_folder = modified_at(path).strftime("%m-%b")
           date_title = modified_at(path).strftime("%Y-%m-%d %H.%M.%S")
           filename = File.basename(path)
        end

      end

      new_path     = File.join(receipts_uploads, year_folder, month_folder, filename)
      rename(path, new_path)
    end
  end

  rule 'Media' do
    dir('~/Downloads/{[^/]*/,}*.{svg,psd,ai,sketch,eps,psb,ttf,otf,mp3,aac,ape,flac,mkv,mp4,rmvb,rm,avi,wmv,webm,gifv,mp3,m4v,mov,jpg,jpeg,gif,png,webp}').each do |p|
      move(p, '~/Documents/Drive/Sort/Media')
    end
    dir('~/Desktop/{[^/]*/,}*.{svg,psd,ai,sketch,eps,psb,ttf,otf,mp3,aac,ape,flac,mkv,mp4,rmvb,rm,avi,wmv,webm,gifv,mp3,m4v,mov,jpg,jpeg,gif,png,webp}').each do |path|
        if 1.week.since?(accessed_at(path))
            move(path, '~/Documents/Drive/Sort/Media')
        end
    end
  end

  rule 'Move downloaded books' do
    dir('~/Downloads/{[^/]*/,}*.{epub,mobi,azw3,chm}').each do |p|
      move(p, '~/Documents/Drive/Resources/Books')
    end
    dir('~/Desktop/{[^/]*/,}*.{epub,mobi,azw3,chm}').each do |path|
        if 1.week.since?(accessed_at(path))
            move(path, '~/Documents/Drive/Resources/Books')
        end
    end
  end

  rule 'Move Downloaded doc(s) to reading' do
      dir('~/Downloads/*.{xls,xlsx,doc,docx,ppt,pptx,txt,md,pdf}').each do |path|
          move(path, '~/Documents/Drive/Sort/Saves')
      end
      dir('~/Desktop/*.{xls,xlsx,doc,docx,ppt,pptx,txt,md,pdf}').each do |path|
          if 1.week.since?(accessed_at(path))
              move(path, '~/Documents/Drive/Sort/Saves')
          end
      end
  end

  rule 'Remove incomplete download file' do
    find('~/Downloads/').grep(/\.td(|\.\w{1,3})$/).each do |p|
      if 3.days.since?(accessed_at(p))
        trash(p)
      end
    end
  end

  rule 'Remove empty directories' do
    dir('~/Downloads/*').each do |p|
      if File.directory?(p) && dir("#{p}/*").empty?
        trash(p)
      end
    end
  end

  rule 'Trash downloads over a week old' do
    dir('~/Downloads/*').each do |path|
      if 1.weeks.since?(accessed_at(path))
        trash(path)
      end
    end
  end

  rule 'Trash incomplete downloads' do
    trash dir('~/Downloads/*.download').select { |p| 3.days.since modified_at p }
  end

  rule 'Trash zips and tarballs downloaded from GitHub' do
    dir('~/Downloads/*.{zip,tgz,gz,rar,tar}').each do |path|
      if downloaded_from(path).any? { |u| u.match %r{//([^\/]+\.)?github\.com\/} }
        trash path
      end
    end
  end

end
