import { TestBed } from '@angular/core/testing';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('SanitizeHtmlPipe', () => {
  let service: DomSanitizer;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomSanitizer);
  });

  it('create an instance', () => {
    const pipe = new SanitizeHtmlPipe(service);
    expect(pipe).toBeTruthy();
  });
});
