package lt.techin.store.model.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lt.techin.store.model.Platform;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class PlatformConverter implements AttributeConverter<Platform, String> {
    @Override
    public String convertToDatabaseColumn(Platform platform) {
        if (platform == null) {
            return null;
        }
        return platform.getCode();
    }

    @Override
    public Platform convertToEntityAttribute(String s) {
        if (s == null) {
            return null;
        }
        return Stream.of(Platform.values())
                .filter(p -> p.getCode().equals(s))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
