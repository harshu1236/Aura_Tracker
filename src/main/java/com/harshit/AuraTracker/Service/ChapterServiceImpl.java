package com.harshit.AuraTracker.Service;

import com.harshit.AuraTracker.Repository.ChapterRepository;
import com.harshit.AuraTracker.Repository.CourseRepository;
import com.harshit.AuraTracker.modal.Chapter;
import com.harshit.AuraTracker.modal.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChapterServiceImpl implements ChapterService{

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Chapter> getChaptersByCourse(Long courseId) {
        return chapterRepository.findByCourseId(courseId);
    }

    public Chapter addChapter(Long courseId, Chapter chapter) throws Exception {
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isPresent()) {
            chapter.setCourse(course.get());
            return chapterRepository.save(chapter);
        } else {
            throw new Exception("Course not found");
        }
    }

    public Chapter markChapterComplete(Long chapterId) throws Exception {
        Optional<Chapter> chapter = chapterRepository.findById(chapterId);
        if (chapter.isPresent()) {
            Chapter ch = chapter.get();
            ch.setCompleted(true);
            return chapterRepository.save(ch);
        } else {
            throw new Exception("Chapter not found");
        }
    }
}
